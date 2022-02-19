/* eslint-disable @typescript-eslint/no-unused-vars */

import { Tab } from "@headlessui/react";
import className from "classnames";

import { Layout } from "./components/Layout";

import { BranchAndBoundExample } from "./components/BranchAndBoundExample";
import { SimplexMethodExample } from "./components/SimplexMethodExample";
import { TabGroup } from "./components/UI/Tabs/TabGroup";
import { TabLabel } from "./components/UI/Tabs/TabLabel";
import { TabList } from "./components/UI/Tabs/TabList";
import { TabPanels } from "./components/UI/Tabs/TabPanels";
import { TabPanel } from "./components/UI/Tabs/TabPanel";
import { InputTab } from "./components/InputTab";

const App = () => {
  return (
    <Layout>
      <TabGroup>
        <TabList>
          <TabLabel>Source Data</TabLabel>
          <TabLabel>Relaxed Solution</TabLabel>
          <TabLabel>Integer Solution</TabLabel>
        </TabList>
        <TabPanels>
          <TabPanel>
            <InputTab />
          </TabPanel>
          <TabPanel>
            <SimplexMethodExample />
          </TabPanel>
          <TabPanel>
            <BranchAndBoundExample />
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </Layout>
  );
};

export default App;
