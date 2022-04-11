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

export interface ExperimentParams {
  start: number;
  end: number;
  step: number;
  transformProblem: TransformProblem;
}

export interface DiagramData {
  labels: string[];
  datasets: DiagramDataset[];
}

export interface DiagramDataset {
  label: string;
  data: number[];
}

export const getExperimentSolutions = (sourceProblem: Problem, params: ExperimentParams): DiagramData => {
  const { start, end, step, transformProblem } = params;

  const valuesCount = Math.floor((end - start) / step);
  if (valuesCount < 0) {
    throw new Error("Wrong experiment params");
  }

  const paramValues = new Array(valuesCount + 1).fill(null).map((_, idx) => start + idx * step);

  const problems = paramValues.map((param) => transformProblem(sourceProblem, param));

  const solutions = problems
    .map((problem) => solveByBranchAndBoundMethod(getTableauFromProblem(problem)))
    .map((solution) => solution.solution);

  const labels = Array.from(new Set(solutions.map((solution) => Object.keys(solution)).flat()));

  const datasets: DiagramDataset[] = labels.map((label) => ({
    label,
    data: solutions.map((solution) => (solution[label] ? solution[label] : 0)),
  }));

  return { labels: paramValues.map(String), datasets };
};
