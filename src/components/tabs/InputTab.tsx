import React from "react";
import { useSelector } from "react-redux";

import {
  selectAlpha,
  selectLowerBoundAlpha,
  selectOptimistProblemLatex,
  selectPessimistProblemLatex,
  selectProblemLatex,
  selectUpperBoundAlpha,
} from "../../rdx/selectors";
import { InlineLatex } from "../InlineLatex";
import { InputProblem } from "../InputProblem";
import { LatexStatements } from "../LatexStatements";

export interface InputTabProps {}

export const InputTab: React.FC<InputTabProps> = () => {
  const problemLatex = useSelector(selectProblemLatex);
  const alpha = useSelector(selectAlpha);
  const lowerBoundAlpha = useSelector(selectLowerBoundAlpha);
  const upperBoundAlpha = useSelector(selectUpperBoundAlpha);
  const optimistProblemLatex = useSelector(selectOptimistProblemLatex);
  const pessimistProblemLatex = useSelector(selectPessimistProblemLatex);

  return (
    <div>
      <InputProblem />
      <p className="mt-4">
        Позначимо через <InlineLatex>{"x_{ij}"}</InlineLatex> - кількість підприємстві <InlineLatex>j</InlineLatex>-го
        типу, на яких буде вироблятися виріб <InlineLatex>i</InlineLatex>-го типу, через <InlineLatex>x</InlineLatex>{" "}
        кількість комплектів.
      </p>

      <h3 className="mt-4 font-bold text-lg">Чітка задача</h3>
      <LatexStatements statements={problemLatex} className="mt-2" />

      <h3 className="mt-4 font-bold text-lg">Нечітка задача</h3>
      <p className="mt-4">
        Інтервал нечіткої множини <InlineLatex>{"a_{ij}"}</InlineLatex>
        рівня <InlineLatex>{`\\alpha_0=${alpha}`}</InlineLatex>
      </p>
      <p className="mt-4">
        <InlineLatex>{`${lowerBoundAlpha} {a}_{ij} \\le a_{ij} \\le ${upperBoundAlpha}{a}_{ij}`}</InlineLatex>
      </p>

      <h3 className="mt-4 font-bold text-lg">Задача оптиміста</h3>
      <LatexStatements statements={optimistProblemLatex} className="mt-2" />

      <h3 className="mt-4 font-bold text-lg">Задача песиміста</h3>
      <LatexStatements statements={pessimistProblemLatex} className="mt-2" />
    </div>
  );
};
