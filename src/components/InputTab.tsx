import React from "react";

import { defaultAlphaZero, defaultProblem } from "../const/problem";
import { getLatexFromProblem, Problem } from "../core/Problem";
import { InlineLatex } from "./InlineLatex";
import { InputProblem } from "./InputProblem";
import { NumberInput } from "./UI/NumberInput";

export interface InputTabProps {}

export const InputTab: React.FC<InputTabProps> = () => {
  const [crispProblemLatex, setCrispProblemLatex] = React.useState<string[]>([]);
  const [alpha, setAlpha] = React.useState(defaultAlphaZero);

  const handleSubmit = React.useCallback((value: Problem) => {
    setCrispProblemLatex(getLatexFromProblem(value));
  }, []);

  const handleReset = React.useCallback(() => {
    setAlpha(defaultAlphaZero);
  }, []);

  const handleAlphaChange = React.useCallback((value) => setAlpha(value), []);

  return (
    <div>
      <InputProblem onSubmit={handleSubmit} defaultProblem={defaultProblem} onReset={handleReset}>
        <div className="mt-4">
          <label htmlFor="input-alpha">
            <span>Ступень недомінованості</span>
            <InlineLatex className="ml-1">{"\\alpha_0"}</InlineLatex>
            <NumberInput
              id="input-alpha"
              key={`${alpha}`}
              value={alpha}
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
        {crispProblemLatex.map((statement) => (
          <div key={`statement-${statement}`}>
            <InlineLatex>{statement}</InlineLatex>
          </div>
        ))}
      </div>
    </div>
  );
};
