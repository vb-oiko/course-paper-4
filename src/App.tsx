/* eslint-disable @typescript-eslint/no-unused-vars */

import { Layout } from "./components/Layout";

import { TableauComponent } from "./components/TableauComponent";
import {
  sampleTableau1,
  sampleTableau2,
  sampleTableau3,
  sampleTableau4,
  sampleTableau5,
  sampleTableau6,
  sampleTableau7,
} from "./const/tableaus";
import { BranchAndBoundNode } from "./core/methods/BranchAndBoundMethod/BranchAndBoundNode";
import { solveByTwoPhaseMethod } from "./core/methods/solveByTwoPhaseMethod";
import { solveByGomoryMethod } from "./core/methods/solveByGomoryMethod";
import { Collapse } from "./components/Collapse";

const tableau = sampleTableau7;

const node = new BranchAndBoundNode(tableau);
const tableaus = node.getTableaus();
// const tableaus = [tableau, ...solveByTwoPhaseMethod(tableau, 20, true)];

const App = () => {
  return (
    <Layout>
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
    </Layout>
  );
};

export default App;
