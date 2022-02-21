import React from "react";
import { useSelector } from "react-redux";

import { selectProblemLatex } from "../rdx/selectors";
import { InlineLatex } from "./InlineLatex";
import { InputProblem } from "./InputProblem";

export interface InputTabProps {}

export const InputTab: React.FC<InputTabProps> = () => {
  const problemLatex = useSelector(selectProblemLatex);

  return (
    <div>
      <InputProblem />
      <p className="mt-4">
        Позначимо через <InlineLatex>{"x_{ij}"}</InlineLatex> - кількість підприємстві <InlineLatex>j</InlineLatex>-го
        типу, на яких буде вироблятися виріб <InlineLatex>i</InlineLatex>-го типу, через <InlineLatex>Z</InlineLatex>{" "}
        кількість комплектів.
      </p>
      <h3 className="mt-4 font-bold text-lg">Чітка задача</h3>
      <div className="mt-4">
        {problemLatex.map((statement) => (
          <div key={`statement-${statement}`}>
            <InlineLatex>{statement}</InlineLatex>
          </div>
        ))}
      </div>
    </div>
  );
};
