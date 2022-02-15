import { Layout } from "./components/Layout";
import { TableauComponent } from "./components/TableauComponent";
import {
  sampleTableau1,
  sampleTableau2,
  sampleTableau3,
  sampleTableau4,
  sampleTableau5,
} from "./const/tableaus";
import { solveByGomoryMethod } from "./core/solve";

const App = () => {
  const tableaus = solveByGomoryMethod(sampleTableau5, 20, true);

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
