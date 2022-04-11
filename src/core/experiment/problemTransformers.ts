import update from "immutability-helper";
import { TransformProblem } from ".";
import { Problem } from "../Problem";

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
