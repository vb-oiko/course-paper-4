import { Tableau } from "../../Tableau";
import { maxElement } from "../../utils";
import { BranchAndBoundNode } from "./BranchAndBoundNode";

export const solveByBranchAndBoundMethod = (
  tableau: Tableau
): BranchAndBoundNode[] => {
  const nodes: BranchAndBoundNode[] = [];

  let nextBranchingNode = new BranchAndBoundNode(tableau, nodes.length);

  nodes.push(nextBranchingNode);
  let lowerBound = nextBranchingNode.lowerBound;
  let bestIntegerSolution = nextBranchingNode.bestIntegerSolution;

  // while(true)do{}

  const { upperBoundTableau, lowerBoundTableau } =
    nextBranchingNode.getBranchedTableaus();

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

  nextBranchingNode = maxElement(
    nodes.filter((node) => node.isBranchingPossible),
    (nodeA, nodeB) => nodeA.upperBound > nodeB.upperBound
  );

  return nodes;
};
