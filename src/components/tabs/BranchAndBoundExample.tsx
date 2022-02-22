import { sampleTableau4, sampleTableau7 } from "../../const/tableaus";
import { solveByBranchAndBoundMethod } from "../../core/methods/BranchAndBoundMethod/solveByBranchAndBoundMethod";
import { BranchAndBoundNodeComponent } from "../BranchAndBoundNodeComponent";
import { InlineLatex } from "../InlineLatex";
import { LatexProblemStatement } from "../LatexProblemStatement";

const tableau = sampleTableau4;

const { nodes, maximizedValue, solution } = solveByBranchAndBoundMethod(tableau);

export const BranchAndBoundExample = () => {
  return (
    <>
      <LatexProblemStatement tableau={tableau} className="mb-2" />
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
