import { Layout } from "./components/Layout";
import { TableauComponent } from "./components/TableauComponent";
import {
  sampleTableau1,
  sampleTableau2,
  sampleTableau3,
  sampleTableau4,
  sampleTableau5,
  sampleTableau6,
} from "./const/tableaus";
import { BranchAndBoundNode } from "./core/methods/BranchAndBoundMethod/BranchAndBoundNode";
import { solveByTwoPhaseMethod } from "./core/methods/solveByTwoPhaseMethod";
import { solveByGomoryMethod } from "./core/methods/solveByGomoryMethod";

const tableau = sampleTableau5;

const node = new BranchAndBoundNode(tableau);
console.warn(node);

const App = () => {
  const tableaus = [tableau, ...solveByTwoPhaseMethod(tableau, 20, true)];

  return (
    <Layout>
      {tableaus.map((tableau, idx) => (
        <div key={idx} className="mb-6">
          <div>{`Iteration: ${idx}`}</div>
          <TableauComponent tableau={tableau} pivot={tableau.pivot()} />
          {tableau.comments.map((comment, commentIdx) => (
            <div key={comment}>{comment}</div>
          ))}
        </div>
      ))}
    </Layout>
  );
};

export default App;
