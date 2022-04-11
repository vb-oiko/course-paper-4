import { solveByBranchAndBoundMethod } from "../methods/BranchAndBoundMethod/solveByBranchAndBoundMethod";
import { getTableauFromProblem, Problem } from "../Problem";
import update from "immutability-helper";

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

export const getExperimentSolutions = (sourceProblem: Problem, params: ExperimentParams) => {
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

  const datasets = labels.map((label) => ({
    label,
    data: solutions.map((solution) => (solution[label] ? solution[label] : 0)),
  }));

  return { labels: paramValues.map(String), datasets };
};

export const getFactoryTransformProblem =
  (factoryIndex: number): TransformProblem =>
  (problem: Problem, value: number) => {
    return update(problem, { b: { [factoryIndex]: { $set: value } } });
  };

export const getProductTransformProblem =
  (productIndex: number): TransformProblem =>
  (problem: Problem, value: number) => {
    return update(problem, { p: { [productIndex]: { $set: value } } });
  };

export const getProductProductivityTransformProblem =
  (productIndex: number): TransformProblem =>
  (problem: Problem, factor: number) => {
    return update(problem, { a: { [productIndex]: { $apply: (row: number[]) => row.map((item) => item * factor) } } });
  };

export const getFactoryProductivityTransformProblem =
  (columnIndex: number): TransformProblem =>
  (problem: Problem, factor: number) => {
    return update(problem, {
      a: {
        $apply: (rows: number[][]) =>
          rows.map((row) => row.map((item, index) => (index === columnIndex ? item * factor : item))),
      },
    });
  };
