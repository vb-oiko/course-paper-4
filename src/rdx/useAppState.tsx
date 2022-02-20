import React from "react";
import { defaultProblem, defaultAlphaZero } from "../const/problem";
import { Problem } from "../core/Problem";
import { AppAction } from "./actions";
import update from "immutability-helper";

export interface AppState {
  problem: Problem;
  alpha: number;
}

export const initialState: AppState = { problem: defaultProblem, alpha: defaultAlphaZero };

const reducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case "CHANGE_PROBLEM_A":
      return update(state, {
        problem: { a: { [action.payload.rowIdx]: { [action.payload.colIdx]: { $set: action.payload.value } } } },
      });
    case "CHANGE_PROBLEM_B":
      return update(state, {
        problem: { b: { [action.payload.colIdx]: { $set: action.payload.value } } },
      });
    case "CHANGE_PROBLEM_P":
      return update(state, {
        problem: { p: { [action.payload.rowIdx]: { $set: action.payload.value } } },
      });
    case "CHANGE_ALPHA":
      return update(state, {
        alpha: { $set: action.payload.value },
      });
    case "RESET_PROBLEM":
      return initialState;
    default:
      throw new Error();
  }
};

export const useAppState = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return { state, dispatch };
};
