import { Tableau } from "../../Tableau";
import { BranchAndBoundNode } from "./BranchAndBoundNode";

export const solveByBranchAndBoundMethod = (
  tableau: Tableau
): BranchAndBoundNode[] => {
  const node = new BranchAndBoundNode(tableau);
  let lowerBound = node.lowerBound;
  let bestIntegerSolution = node.bestIntegerSolution;

  const { upperBoundTableau, lowerBoundTableau } = node.getTableaus();

  const upperBoundNode = new BranchAndBoundNode(
    upperBoundTableau,
    lowerBound,
    bestIntegerSolution
  );
  const lowerBoundNode = new BranchAndBoundNode(
    lowerBoundTableau,
    lowerBound,
    bestIntegerSolution
  );

  return [node, upperBoundNode, lowerBoundNode];
};
