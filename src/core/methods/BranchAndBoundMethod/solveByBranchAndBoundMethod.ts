import { Tableau } from "../../Tableau";
import { BranchAndBoundNode } from "./BranchAndBoundNode";

export const solveByBranchAndBoundMethod = (
  tableau: Tableau
): BranchAndBoundNode[] => {
  const node = new BranchAndBoundNode(tableau);

  return [node];
};
