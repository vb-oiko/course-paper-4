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

const tableau = sampleTableau7;

const node = new BranchAndBoundNode(tableau);
const tableaus = node.getTableaus();

const App = () => {
  // const tableaus = [tableau, ...solveByTwoPhaseMethod(tableau, 20, true)];

  return (
    <Layout>
      {tableaus.map((tableau, idx) => (
        <div key={idx} className="mb-6">
          <div>{`Iteration: ${idx}`}</div>
          <TableauComponent tableau={tableau} />
          {tableau.comments.map((comment, commentIdx) => (
            <div key={comment}>{comment}</div>
          ))}
        </div>
      ))}
    </Layout>
  );
};

export default App;
