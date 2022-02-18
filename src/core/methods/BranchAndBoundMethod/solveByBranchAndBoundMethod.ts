import { Tableau } from "../../Tableau";
import { BranchAndBoundNode } from "./BranchAndBoundNode";

export const solveByBranchAndBoundMethod = (
  tableau: Tableau
): BranchAndBoundNode[] => {
  const nodes: BranchAndBoundNode[] = [];

  const node = new BranchAndBoundNode(tableau, nodes.length);
  nodes.push(node);
  let lowerBound = node.lowerBound;
  let bestIntegerSolution = node.bestIntegerSolution;

  const { upperBoundTableau, lowerBoundTableau } = node.getBranchedTableaus();

  const upperBoundNode = new BranchAndBoundNode(
    upperBoundTableau,
    nodes.length,
    lowerBound,
    bestIntegerSolution
  );
  const lowerBoundNode = new BranchAndBoundNode(
    lowerBoundTableau,
    nodes.length,
    lowerBound,
    bestIntegerSolution
  );
  nodes.push(upperBoundNode, lowerBoundNode);

  return nodes;
};
