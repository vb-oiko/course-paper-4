import React from "react";
import { defaultProblem } from "../const/problem";
import { Problem } from "../core/Problem";
import { AppAction } from "./actions";
import update from "immutability-helper";

export interface AppState {
  problem: Problem;
}

export const init = (problem: Problem): AppState => {
  return { problem };
};

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
    case "RESET_PROBLEM":
      return init(defaultProblem);
    default:
      throw new Error();
  }
};

export const useAppState = () => {
  const [state, dispatch] = React.useReducer(reducer, defaultProblem, init);

  return { state, dispatch };
};
