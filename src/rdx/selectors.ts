import { createSelector } from "@reduxjs/toolkit";
import { EXPERIMENT_OPTIONS } from "../components/experiment/experimentOptions";
import { getExperimentProblems, getExperimentSolutions, getParamValues } from "../core/experiment";
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

export const selectExperimentIndex = (state: AppState) => state.experimentIndex;

export const selectParamIndex = (state: AppState) => state.paramIndex;

export const selectParamOptions = createSelector(
  selectExperimentIndex,
  (experimentIndex) => EXPERIMENT_OPTIONS[experimentIndex].paramOptions
);

export const selectExperiment = createSelector([selectExperimentIndex], (experimentIndex) => {
  return EXPERIMENT_OPTIONS[experimentIndex];
});

export const selectParamValues = createSelector([selectExperiment], (experiment) => {
  return getParamValues(experiment.paramRange);
});

export const selectExperimentProblems = createSelector(
  [selectExperiment, selectParamValues, selectProblem, selectParamIndex],
  (experiment, paramValues, problem, paramIndex) => {
    return getExperimentProblems(problem, paramValues, experiment.problemTransformer(paramIndex));
  }
);

export const selectExperimentDatasets = createSelector([selectExperimentProblems], (problems) => {
  return getExperimentSolutions(problems);
});

export const selectExperimentLabels = createSelector(
  [selectExperiment, selectParamValues],
  (experiment, paramValues) => {
    return paramValues.map(experiment.paramToLabelMapper);
  }
);

export const selectExperimentData = createSelector(
  [selectExperimentLabels, selectExperimentDatasets],
  (labels, datasets) => {
    return { labels, datasets };
  }
);

export const selectExperimentSourceData = createSelector(
  [selectExperimentProblems, selectExperiment, selectParamIndex, selectExperimentLabels],
  (problems, experiment, paramIndex, labels) => {
    const { type } = experiment;
    if (type === "factory") {
      const data = problems.map((problemItem) => {
        return problemItem.a.map((row) => row[paramIndex]);
      });
      const b = paramIndex + 1;
      const datasets = data[0].map((col, i) => ({
        label: `a_{${b}${i + 1}}`,
        data: data.map((row) => Math.round(row[i])),
      }));
      return { labels, datasets };
    }
  }
);
