import { sampleTableau7, sampleTableau8 } from "../const/tableaus";
import { solveByTwoPhaseMethod } from "../core/methods/solveByTwoPhaseMethod";
import { Collapse } from "./Collapse";
import { TableauComponent } from "./TableauComponent";

const tableau = sampleTableau8;
const tableaus = [tableau, ...solveByTwoPhaseMethod(tableau, 20, true)];

export const SimplexMethodExample = () => {
  return (
    <>
      {tableaus.map((tableau, idx) => (
        <div key={idx} className="mb-6">
          <Collapse buttonTitle={`Iteration: ${idx}`} collapsed>
            <TableauComponent tableau={tableau} />
            {tableau.comments.map((comment, commentIdx) => (
              <div key={comment}>{comment}</div>
            ))}
          </Collapse>
        </div>
      ))}
    </>
  );
};
