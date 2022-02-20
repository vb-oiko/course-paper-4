import React from "react";

import { defaultAlphaZero, defaultProblem } from "../const/problem";
import { getLatexFromProblem, Problem } from "../core/Problem";
import { AppAction, changeAlpha } from "../rdx/actions";
import { AppState } from "../rdx/useAppState";
import { InlineLatex } from "./InlineLatex";
import { InputProblem } from "./InputProblem";
import { NumberInput } from "./UI/NumberInput";

export interface InputTabProps {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}

export const InputTab: React.FC<InputTabProps> = ({ state, dispatch }) => {
  const handleAlphaChange = React.useCallback((value) => dispatch(changeAlpha(value)), []);

  return (
    <div>
      <InputProblem state={state} dispatch={dispatch}>
        <div className="mt-4">
          <label htmlFor="input-alpha">
            <span>Ступень недомінованості</span>
            <InlineLatex className="ml-1">{"\\alpha_0"}</InlineLatex>
            <NumberInput
              id="input-alpha"
              key={`${state.alpha}`}
              value={state.alpha}
              onChange={handleAlphaChange}
              className="ml-2 w-24 inline-block"
              min={0.5}
              max={1}
              step={0.05}
            />
          </label>
        </div>
      </InputProblem>
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
