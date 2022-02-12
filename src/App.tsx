import { Layout } from "./components/Layout";
import { TableauComponent } from "./components/TableauComponent";
import {
  sampleTableau1,
  sampleTableau2,
  sampleTableau3,
  sampleTableau4,
} from "./const/tableaus";
import { solve } from "./core/solve";

const App = () => {
  const tableaus = solve(sampleTableau4);

  return (
    <Layout>
      {tableaus.map((tableau, idx) => (
        <>
          <div>{`Iteration: ${idx}`}</div>
          <TableauComponent
            tableau={tableau}
            pivot={tableau.pivot()}
            key={idx}
          />
        </>
      ))}
    </Layout>
  );
};

export default App;
