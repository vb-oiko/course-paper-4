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

const getLowerBoundAlpha = (alpha: number) => 1 - Math.sqrt((1 - alpha) / alpha);
const getUpperBoundAlpha = (alpha: number) => 1 + Math.sqrt((1 - alpha) / alpha);

export const selectProblemLatex = (state: AppState) => getLatexFromProblem(state.problem);

export const selectProblem = (state: AppState) => state.problem;

export const selectAlpha = (state: AppState) => state.alpha;

export const selectLowerBoundAlpha = (state: AppState) => getLowerBoundAlpha(state.alpha);

export const selectUpperBoundAlpha = (state: AppState) => getUpperBoundAlpha(state.alpha);

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
  (problem, upperAlphaBound) =>
    solveByBranchAndBoundMethod(getTableauFromProblem(multiplyAMatrix(problem, upperAlphaBound)))
);

export const selectPessimistBranchAndBoundSolution = createSelector(
  [selectProblem, selectLowerBoundAlpha],
  (problem, lowerAlphaBound) =>
    solveByBranchAndBoundMethod(getTableauFromProblem(multiplyAMatrix(problem, lowerAlphaBound)))
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
  [selectExperimentLabels, selectExperimentDatasets, selectExperiment, selectParamValues, selectProblem],
  (labels, datasets, experiment, paramValues, problem) => {
    const { type } = experiment;
    if (type === "alpha") {
      const optimistValues: number[] = [];
      const pessimistValues: number[] = [];
      const crispValues: number[] = [];

      const {
        solution: { x: crisp },
      } = solveByBranchAndBoundMethod(getTableauFromProblem(problem));

      paramValues.forEach((alpha) => {
        const lowerAlphaBound = getLowerBoundAlpha(alpha);
        const upperAlphaBound = getUpperBoundAlpha(alpha);

        const {
          solution: { x: lower },
        } = solveByBranchAndBoundMethod(getTableauFromProblem(multiplyAMatrix(problem, lowerAlphaBound)));

        const {
          solution: { x: upper },
        } = solveByBranchAndBoundMethod(getTableauFromProblem(multiplyAMatrix(problem, upperAlphaBound)));
        pessimistValues.push(lower);
        optimistValues.push(upper);
        crispValues.push(crisp);
      });

      return {
        labels,
        datasets: [
          { label: "Задача оптиміста", data: optimistValues },
          { label: "Чітка задача", data: crispValues },
          { label: "Задача песиміста", data: pessimistValues },
        ],
      };
    }

    return { labels, datasets };
  }
);

export const selectExperimentSourceData = createSelector(
  [selectExperimentProblems, selectExperiment, selectParamIndex, selectExperimentLabels],
  (problems, experiment, paramIndex, labels) => {
    const { type } = experiment;
    if (type === "factory_productivity") {
      const data = problems.map((problemItem) => {
        return problemItem.a.map((row) => row[paramIndex]);
      });
      const datasets = data[0].map((col, i) => ({
        label: `a_{${i + 1}${paramIndex + 1}}`,
        data: data.map((row) => Math.round(row[i])),
      }));
      return { labels, datasets };
    }

    if (type === "product_productivity") {
      const data = problems.map((problemItem) => {
        return problemItem.a[paramIndex];
      });

      const datasets = data[0].map((col, i) => ({
        label: `a_{${paramIndex + 1}${i + 1}}`,
        data: data.map((row) => Math.round(row[i])),
      }));
      return { labels, datasets };
    }
  }
);

export const selectResultHeader = createSelector([selectExperiment, selectParamIndex], (experiment, paramIndex) => {
  const { type } = experiment;

  if (type === "product_set") {
    return `змін значень розв'язку задачі в залежності від зміни кількості виробів ${
      paramIndex + 1
    }-го типу у комплекті `;
  }

  if (type === "factory_number") {
    return `змін значень розв'язку задачі в залежності від зміни загальної кількості підприємств ${
      paramIndex + 1
    }-го типу `;
  }

  if (type === "factory_productivity") {
    return `змін значень розв'язку задачі в залежності від зміни продуктивності (у відсотках) на підприємствах ${
      paramIndex + 1
    }-го типу для усіх продуктів`;
  }

  if (type === "product_productivity") {
    return `змін значень розв'язку задачі в залежності від зміни продуктивності (у відсотках) при виробництві ${
      paramIndex + 1
    }-го виробу на підприємствах усіх типів`;
  }

  if (type === "alpha") {
    return `змін значень розв'язку задачі оптиміста, чіткої задачі та задачі песиміста в залежності від зміни значення ступеню недомінованості`;
  }
});

export const selectSourceHeader = createSelector([selectExperiment, selectParamIndex], (experiment, paramIndex) => {
  const { type } = experiment;

  if (type === "factory_productivity") {
    return `Таблиця вихідних значень експерименту при зміні продуктивності виробництва на підприємствах ${
      paramIndex + 1
    }-го типу для усіх типів продуктів у відсотках від початкових значень`;
  }

  if (type === "product_productivity") {
    return `Таблиця вихідних значень експерименту при зміні продуктивності виробництва ${
      paramIndex + 1
    }-го виробу на підприємствах усіх типів у відсотках від початкових значень`;
  }
});
