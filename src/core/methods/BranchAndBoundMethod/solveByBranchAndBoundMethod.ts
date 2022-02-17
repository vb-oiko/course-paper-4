import { Tableau } from "../../Tableau";
import { BranchAndBoundNode } from "./BranchAndBoundNode";

export const solveByBranchAndBoundMethod = (
  tableau: Tableau
): BranchAndBoundNode[] => {
  const node = new BranchAndBoundNode(tableau);

  const { upperBoundTableau, lowerBoundTableau } = node.getTableaus();

  const upperBoundNode = new BranchAndBoundNode(upperBoundTableau);
  const lowerBoundNode = new BranchAndBoundNode(lowerBoundTableau);

  return [node, upperBoundNode, lowerBoundNode];
};
