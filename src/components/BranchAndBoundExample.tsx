import { sampleTableau4, sampleTableau7 } from "../const/tableaus";
import { solveByBranchAndBoundMethod } from "../core/methods/BranchAndBoundMethod/solveByBranchAndBoundMethod";
import { getLatexProblemStatement } from "../core/Tableau/getLatexProblemStatement";
import { BranchAndBoundNodeComponent } from "./BranchAndBoundNodeComponent";
import { InlineLatex } from "./InlineLatex";

const tableau = sampleTableau4;

const constraints = getLatexProblemStatement(tableau);

const { nodes, maximizedValue, solution } =
  solveByBranchAndBoundMethod(tableau);

export const BranchAndBoundExample = () => {
  return (
    <>
      <div>
        {constraints.map((constraint, idx) => (
          <div key={`constraint-${idx}`}>
            <InlineLatex>{constraint}</InlineLatex>
          </div>
        ))}
      </div>
      {nodes.map((node, idx) => (
        <div key={idx} className="mb-6">
          <div className="mb-2">{`Node ${idx}`}</div>
          <BranchAndBoundNodeComponent node={node} />
        </div>
      ))}
      <div className="mb-1 text-blue-600 font-semibold">{`Maximized value: ${maximizedValue}`}</div>
      <div className="mb-1 text-blue-600 font-semibold">
        <span className="mr-2">{`Solution:`}</span>
        <InlineLatex>{solution}</InlineLatex>
      </div>
    </>
  );
};
