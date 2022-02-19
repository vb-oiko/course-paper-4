import React from "react";
import { BranchAndBoundNode } from "../core/methods/BranchAndBoundMethod/BranchAndBoundNode";
import { TableauComponent } from "./TableauComponent";
import { Collapse } from "./Collapse";
import { InlineLatex } from "./InlineLatex";

export interface BranchAndBoundNodeComponentProps {
  node: BranchAndBoundNode;
}

const PRECISION = 3;

export const BranchAndBoundNodeComponent: React.FC<BranchAndBoundNodeComponentProps> = ({ node }) => {
  const upperBound = node.upperBound.toFixed(PRECISION);
  const lowerBound = node.lowerBound.toFixed(PRECISION);

  return (
    <>
      <div className="mb-1">{`Solution is ${!node.isSolutionFeasible ? "NOT " : ""}feasible`}</div>
      {node.isSolutionFeasible ? (
        <>
          <div className="mb-1">
            <span className="mr-2">{`Upper bound: ${upperBound},`}</span>
            <InlineLatex>{node.optimalSolution}</InlineLatex>
          </div>
          <div className="mb-1">
            <span className="mr-2">{`Lower bound: ${lowerBound},`}</span>
            <InlineLatex>{node.bestIntegerSolution}</InlineLatex>
          </div>
          <div className="mb-1">{`Solution is ${!node.isSolutionInteger ? "NOT " : ""}integer`}</div>
          {node.isBranchingPossible ? (
            <>
              <div className="mb-1">{`Possible new constraints: ${node.newConstraints}`}</div>
              <div className="mb-1">{`Branching is ${!node.isBranchingDone ? "NOT " : ""}done`}</div>
            </>
          ) : null}
        </>
      ) : null}
      <div className="mb-1">{`Branching is ${!node.isBranchingPossible ? "NOT " : ""}possible`}</div>
      <div className="mb-2"></div>
      <Collapse buttonTitle="Tableaus" collapsed>
        {node.tableaus.map((tableau, idx) => (
          <div key={`${node.id}-${idx}`} className="mb-6">
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
