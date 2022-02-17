import React from "react";
import { BranchAndBoundNode } from "../core/methods/BranchAndBoundMethod/BranchAndBoundNode";
import { TableauComponent } from "./TableauComponent";
import { Collapse } from "./Collapse";

export interface BranchAndBoundNodeComponentProps {
  node: BranchAndBoundNode;
}

export const BranchAndBoundNodeComponent: React.FC<
  BranchAndBoundNodeComponentProps
> = ({ node }) => {
  return (
    <>
      <div className="mb-1">{`Upper bound: ${node.upperBound.toFixed(3)}  (${
        node.optimalSolution
      })`}</div>
      <div className="mb-1">{`Lower bound: ${node.lowerBound.toFixed(3)}  (${
        node.bestIntegerSolution
      })`}</div>
      <div className="mb-1">{`Solution is ${
        !node.isSolutionFeasible ? "NOT " : ""
      }feasible`}</div>
      <div className="mb-1">{`Branching is ${
        !node.isBranchingPossible ? "NOT " : ""
      }possible`}</div>
      <div className="mb-2"></div>
      <Collapse buttonTitle="Tableaus" collapsed>
        {node.tableaus.map((tableau, idx) => (
          <div key={idx} className="mb-6">
            <TableauComponent tableau={tableau} />
            {tableau.comments.map((comment, commentIdx) => (
              <div key={comment}>{comment}</div>
            ))}
          </div>
        ))}
      </Collapse>
    </>
  );
};
