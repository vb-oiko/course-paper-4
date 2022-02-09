import React from "react";
import { Layout } from "./components/Layout";
import { TableauComponent } from "./components/TableauComponent";
import { sampleTableau1 } from "./const/tableaus";

const App = () => {
  return (
    <Layout>
      <TableauComponent tableau={sampleTableau1} />
    </Layout>
  );
};

export default App;
