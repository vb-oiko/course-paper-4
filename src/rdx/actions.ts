export type AppActionType =
  | "CHANGE_PROBLEM_A"
  | "CHANGE_PROBLEM_B"
  | "CHANGE_PROBLEM_P"
  | "RESET_PROBLEM"
  | "CHANGE_ALPHA";

export type AppAction =
  | { type: "CHANGE_PROBLEM_A"; payload: { rowIdx: number; colIdx: number; value: number } }
  | { type: "CHANGE_PROBLEM_B"; payload: { colIdx: number; value: number } }
  | { type: "CHANGE_PROBLEM_P"; payload: { rowIdx: number; value: number } }
  | { type: "RESET_PROBLEM"; payload: {} }
  | { type: "CHANGE_ALPHA"; payload: { value: number } }
  | { type: "SET_EXPERIMENT_INDEX"; payload: { experimentIndex: number } }
  | { type: "SET_PARAM_INDEX"; payload: { paramIndex: number } };

export const changeProblemA = (rowIdx: number, colIdx: number, value: number): AppAction => ({
  type: "CHANGE_PROBLEM_A",
  payload: { rowIdx, colIdx, value },
});

export const changeProblemB = (colIdx: number, value: number): AppAction => ({
  type: "CHANGE_PROBLEM_B",
  payload: { colIdx, value },
});

export const changeProblemP = (rowIdx: number, value: number): AppAction => ({
  type: "CHANGE_PROBLEM_P",
  payload: { rowIdx, value },
});

export const resetProblem = (): AppAction => ({
  type: "RESET_PROBLEM",
  payload: {},
});

export const changeAlpha = (value: number): AppAction => ({
  type: "CHANGE_ALPHA",
  payload: { value },
});

export const setExperimentIndex = (experimentIndex: number): AppAction => ({
  type: "SET_EXPERIMENT_INDEX",
  payload: { experimentIndex },
});

export const setParamIndex = (paramIndex: number): AppAction => ({
  type: "SET_PARAM_INDEX",
  payload: { paramIndex },
});
