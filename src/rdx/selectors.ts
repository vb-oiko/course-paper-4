import { createSelector } from "@reduxjs/toolkit";
import { solveByBranchAndBoundMethod } from "../core/methods/BranchAndBoundMethod/solveByBranchAndBoundMethod";
import {
  getLatexFromAlphaLevelProblem,
  getLatexFromProblem,
  getTableauFromProblem,
  multiplyAMatrix,
} from "../core/Problem";
import { AppState } from "./reducer";

export const selectProblemLatex = (state: AppState) => getLatexFromProblem(state.problem);

export const selectProblem = (state: AppState) => state.problem;

export const selectAlpha = (state: AppState) => state.alpha;

export const selectLowerBoundAlpha = (state: AppState) => 1 - Math.sqrt((1 - state.alpha) / state.alpha);

export const selectUpperBoundAlpha = (state: AppState) => 1 + Math.sqrt((1 - state.alpha) / state.alpha);

export const selectOptimistProblemLatex = createSelector(
  [selectProblem, selectUpperBoundAlpha],
  getLatexFromAlphaLevelProblem
);

export const selectPessimistProblemLatex = createSelector(
  [selectProblem, selectLowerBoundAlpha],
  getLatexFromAlphaLevelProblem
);

export const selectCrispBranchAndBoundSolution = createSelector([selectProblem], (problem) =>
  solveByBranchAndBoundMethod(getTableauFromProblem(problem))
);

export const selectOptimistBranchAndBoundSolution = createSelector(
  [selectProblem, selectUpperBoundAlpha],
  (problem, alpha) => solveByBranchAndBoundMethod(getTableauFromProblem(multiplyAMatrix(problem, alpha)))
);

export const selectPessimistBranchAndBoundSolution = createSelector(
  [selectProblem, selectLowerBoundAlpha],
  (problem, alpha) => solveByBranchAndBoundMethod(getTableauFromProblem(multiplyAMatrix(problem, alpha)))
);
