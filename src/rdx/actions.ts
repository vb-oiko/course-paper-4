export type AppActionType = "CHANGE_PROBLEM_A" | "CHANGE_PROBLEM_B" | "CHANGE_PROBLEM_P" | "RESET_PROBLEM";

export type AppAction =
  | { type: "CHANGE_PROBLEM_A"; payload: { rowIdx: number; colIdx: number; value: number } }
  | { type: "CHANGE_PROBLEM_B"; payload: { colIdx: number; value: number } }
  | { type: "CHANGE_PROBLEM_P"; payload: { rowIdx: number; value: number } }
  | { type: "RESET_PROBLEM"; payload: {} };

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
