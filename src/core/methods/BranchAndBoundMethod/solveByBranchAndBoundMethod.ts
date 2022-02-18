import { Tableau } from "../../Tableau";
import { maxElement } from "../../utils";
import { BranchAndBoundNode } from "./BranchAndBoundNode";

const MAX_ITERATIONS = 3;

export const solveByBranchAndBoundMethod = (
  tableau: Tableau
): BranchAndBoundNode[] => {
  const nodes: BranchAndBoundNode[] = [];

  let nextBranchingNode = new BranchAndBoundNode(tableau, nodes.length);
  let iterations = 0;

  nodes.push(nextBranchingNode);
  let lowerBound = nextBranchingNode.lowerBound;
  let bestIntegerSolution = nextBranchingNode.bestIntegerSolution;

  while (!nextBranchingNode.isSolutionInteger && iterations < MAX_ITERATIONS) {
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

    const branchAbleNodes = nodes.filter((node) => node.isBranchingPossible);

    if (branchAbleNodes.length === 0) {
      lowerBoundNode.comments.push("No more nodes to branch");
      break;
    }

    nextBranchingNode = maxElement(
      branchAbleNodes,
      (nodeA, nodeB) => nodeA.upperBound > nodeB.upperBound
    );
    nextBranchingNode.comments.push(
      `Iteration: ${iterations}, selected as the next node to branch`
    );
    iterations += 1;
  }

  return nodes;
};
