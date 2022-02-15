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
import { solveByTwoPhaseMethod } from "./core/solve";

const App = () => {
  const tableaus = [
    sampleTableau6,
    ...solveByTwoPhaseMethod(sampleTableau6, 20, false),
  ];

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
