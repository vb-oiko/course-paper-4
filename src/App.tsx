import { Layout } from "./components/Layout";

import { Tab, TabGroup } from "./components/UI/TabGroup";

import { InputTab } from "./components/tabs/InputTab";
import { SolutionTab } from "./components/tabs/SolutionTab";
import { ExperimentTab } from "./components/tabs/ExperimentTab";
import { ProblemStatementTab } from "./components/tabs/ProblemStatementTab";
import { SimplexMethodExample } from "./components/tabs/SimplexMethodExample";
import { BranchAndBoundExample } from "./components/tabs/BranchAndBoundExample";

const App = () => {
  const tabs: Tab[] = [
    { name: "Постановка задачі", component: <ProblemStatementTab /> },
    { name: "Математична модель", component: <SolutionTab /> },
    { name: "Дані та рішення", component: <InputTab /> },
    { name: "Симплекс-метод", component: <SimplexMethodExample /> },
    { name: "Метод гілок та границь", component: <BranchAndBoundExample /> },
    { name: "Експерименти", component: <ExperimentTab /> },
  ];
  return (
    <Layout>
      <TabGroup tabs={tabs} />
    </Layout>
  );
};

export default App;
