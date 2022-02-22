import React from "react";
import { useSelector } from "react-redux";
import {
  selectProblemLatex,
  selectOptimistProblemLatex,
  selectPessimistProblemLatex,
  selectCrispBranchAndBoundSolution,
  selectOptimistBranchAndBoundSolution,
  selectPessimistBranchAndBoundSolution,
} from "../../rdx/selectors";
import { SolutionComponent } from "../SolutionComponent";

export interface SolutionTabProps {}

export const SolutionTab: React.FC<SolutionTabProps> = () => {
  return (
    <>
      <div>
        <SolutionComponent
          title={"Чітка задача"}
          problemLatexStatements={useSelector(selectProblemLatex)}
          solution={useSelector(selectCrispBranchAndBoundSolution)}
        />
      </div>

      <div>
        <SolutionComponent
          title={"Задача оптиміста"}
          problemLatexStatements={useSelector(selectOptimistProblemLatex)}
          solution={useSelector(selectOptimistBranchAndBoundSolution)}
        />
      </div>

      <div>
        <SolutionComponent
          title={"Задача песиміста"}
          problemLatexStatements={useSelector(selectPessimistProblemLatex)}
          solution={useSelector(selectPessimistBranchAndBoundSolution)}
        />
      </div>
    </>
  );
};
