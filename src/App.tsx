import { Layout } from "./components/Layout";

import { BranchAndBoundExample } from "./components/BranchAndBoundExample";
import { SimplexMethodExample } from "./components/SimplexMethodExample";
import { Tab, TabGroup } from "./components/UI/TabGroup";

import { InputTab } from "./components/InputTab";

const App = () => {
  const tabs: Tab[] = [
    { name: "Source data", component: <InputTab /> },
    { name: "Simplex method", component: <SimplexMethodExample /> },
    { name: "Branch and bound method", component: <BranchAndBoundExample /> },
  ];
  return (
    <Layout>
      <TabGroup tabs={tabs} />
    </Layout>
  );
};

export default App;
