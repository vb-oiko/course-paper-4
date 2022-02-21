import { createSelector } from "@reduxjs/toolkit";
import { getLatexFromProblem, Problem } from "../core/Problem";
import { AppState } from "./reducer";

export const selectProblemLatex = (state: AppState) => getLatexFromProblem(state.problem);

export const selectProblem = (state: AppState) => state.problem;

export const selectAlpha = (state: AppState) => state.alpha;

export const selectLowerBoundAlpha = (state: AppState) => 1 - Math.sqrt((1 - state.alpha) / state.alpha);

export const selectUpperBoundAlpha = (state: AppState) => 1 + Math.sqrt((1 - state.alpha) / state.alpha);

const multiplyAMatrix = ({ a: baseA, b, p }: Problem, alpha: number) => {
  const a = baseA.map((row) => row.map((value) => Math.floor(value * alpha)));

  return getLatexFromProblem({ a, b, p });
};

export const selectOptimistProblemLatex = createSelector([selectProblem, selectUpperBoundAlpha], multiplyAMatrix);

export const selectPessimistProblemLatex = createSelector([selectProblem, selectLowerBoundAlpha], multiplyAMatrix);
