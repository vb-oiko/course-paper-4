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
      <div className="mb-1">{`Solution is ${
        !node.isSolutionFeasible ? "NOT " : ""
      }feasible`}</div>
      {node.isSolutionFeasible ? (
        <>
          <div className="mb-1">{`Upper bound: ${node.upperBound.toFixed(
            3
          )}  (${node.optimalSolution})`}</div>
          <div className="mb-1">{`Lower bound: ${node.lowerBound.toFixed(
            3
          )}  (${node.bestIntegerSolution})`}</div>

          <div className="mb-1">{`Solution is ${
            !node.isSolutionInteger ? "NOT " : ""
          }integer`}</div>
          <div className="mb-1">{`Possible new constraints: ${node.newConstraints}`}</div>
          <div className="mb-1">
            {node.isBranchingPossible
              ? "Branching is possible"
              : "Branching is not possible, or has been already done"}
          </div>
        </>
      ) : null}
      <div className="mb-2"></div>
      <Collapse buttonTitle="Tableaus" collapsed>
        {node.tableaus.map((tableau) => (
          <div key={node.id} className="mb-6">
            <TableauComponent tableau={tableau} />
            {tableau.comments.map((comment, commentIdx) => (
              <div key={comment}>{comment}</div>
            ))}
          </div>
        ))}
      </Collapse>
      <div className="mb-2"></div>
      {node.comments.map((comment, idx) => (
        <div key={idx} className="mb-1">
          {comment}
        </div>
      ))}
    </>
  );
};
