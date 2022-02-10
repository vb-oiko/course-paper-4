import { Layout } from "./components/Layout";
import { TableauComponent } from "./components/TableauComponent";
import { sampleTableau1 } from "./const/tableaus";

const App = () => {
  const nextTableau = sampleTableau1.next();

  return (
    <Layout>
      <TableauComponent
        tableau={sampleTableau1}
        pivot={sampleTableau1.pivot()}
      />
      <div>{`Is optimal: ${sampleTableau1.isOptimal()}`} </div>
      <div>{`Pivot column: ${sampleTableau1.pivotColumn()}`} </div>
      <div>{`Pivot row: ${sampleTableau1.pivotRow()}`} </div>
      {nextTableau ? (
        <>
          <TableauComponent tableau={nextTableau} pivot={nextTableau.pivot()} />
          <div>{`Is optimal: ${nextTableau.isOptimal()}`} </div>
          <div>{`Pivot column: ${nextTableau.pivotColumn()}`} </div>
          <div>{`Pivot row: ${nextTableau.pivotRow()}`} </div>
        </>
      ) : null}
    </Layout>
  );
};

export default App;
