import { sampleTableau7 } from "../const/tableaus";
import { BranchAndBoundNode } from "../core/methods/BranchAndBoundMethod/BranchAndBoundNode";
import { BranchAndBoundNodeComponent } from "./BranchAndBoundNodeComponent";

const tableau = sampleTableau7;
const node = new BranchAndBoundNode(tableau);

export const BranchAndBoundExample = () => {
  return <BranchAndBoundNodeComponent node={node} />;
};
