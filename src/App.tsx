import { Layout } from "./components/Layout";

import { Tab, TabGroup } from "./components/UI/TabGroup";

import { InputTab } from "./components/tabs/InputTab";
import { SolutionTab } from "./components/tabs/SolutionTab";
import { ExperimentTab } from "./components/tabs/ExperimentTab";

const App = () => {
  const tabs: Tab[] = [
    { name: "Експерименти", component: <ExperimentTab /> },
    { name: "Вихідні дані", component: <InputTab /> },
    { name: "Рішення", component: <SolutionTab /> },
  ];
  return (
    <Layout>
      <TabGroup tabs={tabs} />
    </Layout>
  );
};

export default App;
