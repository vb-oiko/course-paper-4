import { sampleTableau7 } from "../const/tableaus";
import { solveByBranchAndBoundMethod } from "../core/methods/BranchAndBoundMethod/solveByBranchAndBoundMethod";
import { BranchAndBoundNodeComponent } from "./BranchAndBoundNodeComponent";

const tableau = sampleTableau7;
const nodes = solveByBranchAndBoundMethod(tableau);

export const BranchAndBoundExample = () => {
  return (
    <>
      {nodes.map((node, idx) => (
        <div key={idx} className="mb-6">
          <div className="mb-2">{`Node ${idx}`}</div>
          <BranchAndBoundNodeComponent node={node} />
        </div>
      ))}
    </>
  );
};
