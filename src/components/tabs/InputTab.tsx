import React from "react";
import { useSelector } from "react-redux";

import {
  selectAlpha,
  selectCrispBranchAndBoundSolution,
  selectLowerBoundAlpha,
  selectOptimistBranchAndBoundSolution,
  selectOptimistProblemLatex,
  selectPessimistBranchAndBoundSolution,
  selectPessimistProblemLatex,
  selectProblemLatex,
  selectUpperBoundAlpha,
} from "../../rdx/selectors";
import { InlineLatex } from "../InlineLatex";
import { InputProblem } from "../InputProblem";
import { SolutionComponent } from "../SolutionComponent";

export interface InputTabProps {}

export const InputTab: React.FC<InputTabProps> = () => {
  const alpha = useSelector(selectAlpha);
  const lowerBoundAlpha = useSelector(selectLowerBoundAlpha);
  const upperBoundAlpha = useSelector(selectUpperBoundAlpha);

  return (
    <div>
      <InputProblem />

      <p className="mt-4">
        Підставимо у математичну модель вихідні дані, запишемо чітку задачу та задачі оптиміста та песиміста та вирішимо
        їх за допомогою симплекс-методу та методу гілок та границь{" "}
      </p>

      <SolutionComponent
        title={"Чітка задача"}
        problemLatexStatements={useSelector(selectProblemLatex)}
        solution={useSelector(selectCrispBranchAndBoundSolution)}
      />

      <h3 className="mt-4 font-bold text-lg">Нечітка задача</h3>
      <p className="mt-4">
        Інтервал нечіткої множини <InlineLatex>{"a_{ij}"}</InlineLatex>
        рівня <InlineLatex>{`\\alpha_0=${alpha}`}</InlineLatex>
      </p>
      <p className="mt-4">
        <InlineLatex>{`${lowerBoundAlpha} {a}_{ij} \\le a_{ij} \\le ${upperBoundAlpha}{a}_{ij}`}</InlineLatex>
      </p>

      <SolutionComponent
        title={"Задача оптиміста"}
        problemLatexStatements={useSelector(selectOptimistProblemLatex)}
        solution={useSelector(selectOptimistBranchAndBoundSolution)}
      />

      <SolutionComponent
        title={"Задача песиміста"}
        problemLatexStatements={useSelector(selectPessimistProblemLatex)}
        solution={useSelector(selectPessimistBranchAndBoundSolution)}
      />
    </div>
  );
};
