import { Tableau } from "../core/Tableau";
import { getLatexProblemStatement } from "../core/Tableau/getLatexProblemStatement";
import { InlineLatex } from "./InlineLatex";

export interface LatexProblemStatementProps {
  tableau: Tableau;
  className?: string;
}

export const LatexProblemStatement: React.FC<LatexProblemStatementProps> = ({ tableau, className }) => {
  const { constraints, objectiveFunction } = getLatexProblemStatement(tableau);

  return (
    <div className={className}>
      <div>
        <InlineLatex>{`${objectiveFunction} \\rightarrow \\max`}</InlineLatex>
      </div>
      {constraints.map((constraint, idx) => (
        <div key={`constraint-${idx}`}>
          <InlineLatex>{constraint}</InlineLatex>
        </div>
      ))}
    </div>
  );
};
