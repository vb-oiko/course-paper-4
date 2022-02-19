import { Tableau } from "../core/Tableau";
import { getLatexProblemStatement } from "../core/Tableau/getLatexProblemStatement";
import { InlineLatex } from "./InlineLatex";

export interface LatexProblemStatementProps {
  tableau: Tableau;
}

export const LatexProblemStatement: React.FC<LatexProblemStatementProps> = ({ tableau }) => {
  const constraints = getLatexProblemStatement(tableau);

  return (
    <>
      {constraints.map((constraint, idx) => (
        <div key={`constraint-${idx}`}>
          <InlineLatex>{constraint}</InlineLatex>
        </div>
      ))}
    </>
  );
};
