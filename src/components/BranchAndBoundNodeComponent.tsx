import React from "react";
import cs from "classnames";
import { BranchAndBoundNode } from "../core/methods/BranchAndBoundMethod/BranchAndBoundNode";
import { TableauComponent } from "./TableauComponent";
import { Collapse } from "./Collapse";
import { camel2title } from "../core/utils";

export interface BranchAndBoundNodeComponentProps {
  node: BranchAndBoundNode;
}

export const BranchAndBoundNodeComponent: React.FC<
  BranchAndBoundNodeComponentProps
> = ({ node }) => {
  const tableaus = Object.entries(node.getTableaus()).map(
    ([title, tableau]) => ({ title: camel2title(title), tableau })
  );

  return (
    <>
      <Collapse buttonTitle="Tableaus" collapsed>
        {tableaus.map((tableau, idx) => (
          <div key={idx} className="mb-6">
            <Collapse buttonTitle={tableau.title} collapsed={false}>
              <TableauComponent tableau={tableau.tableau} />
              {tableau.tableau.comments.map((comment, commentIdx) => (
                <div key={comment}>{comment}</div>
              ))}
            </Collapse>
          </div>
        ))}
      </Collapse>
    </>
  );
};
