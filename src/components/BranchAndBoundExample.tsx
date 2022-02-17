import { sampleTableau7 } from "../const/tableaus";
import { BranchAndBoundNode } from "../core/methods/BranchAndBoundMethod/BranchAndBoundNode";

const tableau = sampleTableau7;

const node = new BranchAndBoundNode(tableau);
const tableaus = node.getTableaus();

export const BranchAndBoundExample = () => {
  return <></>;
};
