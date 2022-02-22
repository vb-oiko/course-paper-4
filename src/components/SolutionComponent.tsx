import { BranchAndBoundNode } from "../core/methods/BranchAndBoundMethod/BranchAndBoundNode";
import { BranchAndBoundMethodSolution } from "../core/methods/BranchAndBoundMethod/solveByBranchAndBoundMethod";
import { InlineLatex } from "./InlineLatex";
import { LatexStatements } from "./LatexStatements";

export interface SolutionComponentProps {
  title: string;
  problemLatexStatements: string[];
  solution: BranchAndBoundMethodSolution;
}

export const SolutionComponent: React.FC<SolutionComponentProps> = ({ title, problemLatexStatements, solution }) => {
  return (
    <div>
      <h3 className="mt-4 font-bold text-lg">{title}</h3>
      <LatexStatements statements={problemLatexStatements} className="mt-2" />
      <div className="mt-2">
        <InlineLatex>{solution.solution}</InlineLatex>
      </div>
    </div>
  );
};
