import { Layout } from "./components/Layout";
import { TableauComponent } from "./components/TableauComponent";
import { sampleTableau1 } from "./const/tableaus";

const App = () => {
  const pivot = {
    column: sampleTableau1.pivotColumn(),
    row: sampleTableau1.pivotRow(),
  };

  return (
    <Layout>
      <TableauComponent tableau={sampleTableau1} pivot={pivot} />
      <div>{`Is optimal: ${sampleTableau1.isOptimal()}`} </div>
      <div>{`Pivot column: ${sampleTableau1.pivotColumn()}`} </div>
      <div>{`Pivot row: ${sampleTableau1.pivotRow()}`} </div>
    </Layout>
  );
};

export default App;
