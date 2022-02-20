import React from "react";

import { getLatexFromProblem } from "../core/Problem";
import { AppAction } from "../rdx/actions";
import { AppState } from "../rdx/useAppState";
import { InlineLatex } from "./InlineLatex";
import { InputProblem } from "./InputProblem";

export interface InputTabProps {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}

export const InputTab: React.FC<InputTabProps> = ({ state, dispatch }) => {
  return (
    <div>
      <InputProblem state={state} dispatch={dispatch}></InputProblem>
      <p className="mt-4">
        Позначимо через <InlineLatex>{"x_{ij}"}</InlineLatex> - кількість підприємстві <InlineLatex>j</InlineLatex>-го
        типу, на яких буде вироблятися виріб <InlineLatex>i</InlineLatex>-го типу, через <InlineLatex>Z</InlineLatex>{" "}
        кількість комплектів.
      </p>
      <h3 className="mt-4 font-bold text-lg">Чітка задача</h3>
      <div className="mt-4">
        {getLatexFromProblem(state.problem).map((statement) => (
          <div key={`statement-${statement}`}>
            <InlineLatex>{statement}</InlineLatex>
          </div>
        ))}
      </div>
    </div>
  );
};
