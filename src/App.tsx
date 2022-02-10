import { Layout } from "./components/Layout";
import { TableauComponent } from "./components/TableauComponent";
import { sampleTableau1 } from "./const/tableaus";
import { solve } from "./core/solve";

const App = () => {
  const tableaus = solve(sampleTableau1);

  return (
    <Layout>
      {tableaus.map((tableau) => (
        <TableauComponent tableau={tableau} pivot={tableau.pivot()} />
      ))}
    </Layout>
  );
};

export default App;
