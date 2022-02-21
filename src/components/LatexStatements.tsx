import { InlineLatex } from "./InlineLatex";

export interface LatexStatementsProps {
  statements: string[];
  className?: string;
}

export const LatexStatements: React.FC<LatexStatementsProps> = ({ statements, className }) => {
  return (
    <div className={className}>
      {statements.map((statement) => (
        <div key={`statement-${statement}`}>
          <InlineLatex>{statement}</InlineLatex>
        </div>
      ))}
    </div>
  );
};
