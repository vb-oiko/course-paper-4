import { Problem } from "../core/Problem";

const a = [
  [200, 100, 300, 50, 20],
  [70, 100, 300, 100, 400],
  [60, 150, 100, 300, 500],
];

const p = [1, 4, 2];

const b = [10, 4, 60, 7, 5];

export const defaultProblem: Problem = { a, b, p };

export const defaultAlphaZero = 0.8;
