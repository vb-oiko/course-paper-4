import { ParamRange } from "../../components/experiment/experimentOptions";
import { solveByBranchAndBoundMethod } from "../methods/BranchAndBoundMethod/solveByBranchAndBoundMethod";
import { getTableauFromProblem, Problem } from "../Problem";

export interface ExperimentResults {
  labels: string[];
  datasets: Dataset[];
}

export interface Dataset {
  label: string;
  data: number[];
}

export type TransformProblem = (problem: Problem, param: number) => Problem;

export type LabelMapper = (value: number) => string;

export interface ExperimentData {
  labels: string[];
  datasets: ExperimentDataset[];
}

export interface ExperimentDataset {
  label: string;
  data: number[];
}

export const getParamValues = (paramRange: ParamRange): number[] => {
  const { start, end, step } = paramRange;

  const valuesCount = Math.floor((end - start) / step);
  if (valuesCount < 0) {
    throw new Error("Wrong experiment params");
  }

  return new Array(valuesCount + 1).fill(null).map((_, idx) => Math.round((start + idx * step) * 100) / 100);
};

export const getExperimentProblems = (
  sourceProblem: Problem,
  paramValues: number[],
  transformProblem: TransformProblem
): Problem[] => {
  return paramValues.map((param) => transformProblem(sourceProblem, param));
};

export const getExperimentSolutions = (problems: Problem[]): ExperimentDataset[] => {
  const solutions = problems
    .map((problem) => solveByBranchAndBoundMethod(getTableauFromProblem(problem)))
    .map((solution) => solution.solution);

  const labels = Array.from(new Set(solutions.map((solution) => Object.keys(solution)).flat()));

  return labels
    .map((label) => ({
      label,
      data: solutions.map((solution) => (solution[label] ? solution[label] : 0)),
    }))
    .sort((datasetA, datasetB) => (datasetA.label < datasetB.label ? -1 : 1));
};
