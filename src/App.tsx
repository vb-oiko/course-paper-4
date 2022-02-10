import { Layout } from "./components/Layout";
import { TableauComponent } from "./components/TableauComponent";
import { sampleTableau2 } from "./const/tableaus";
import { solve } from "./core/solve";

const App = () => {
  const tableaus = solve(sampleTableau2);

  return (
    <Layout>
      {tableaus.map((tableau, idx) => (
        <TableauComponent tableau={tableau} pivot={tableau.pivot()} key={idx} />
      ))}
    </Layout>
  );
};

export default App;
