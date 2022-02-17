/* eslint-disable @typescript-eslint/no-unused-vars */

import { Layout } from "./components/Layout";

import { BranchAndBoundExample } from "./components/BranchAndBoundExample";
import { SimplexMethodExample } from "./components/SimplexMethodExample";

const App = () => {
  return (
    <Layout>
      <BranchAndBoundExample />
    </Layout>
  );
};

export default App;
