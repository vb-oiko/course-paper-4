/* eslint-disable @typescript-eslint/no-unused-vars */

import { Tab } from "@headlessui/react";
import className from "classnames";

import { Layout } from "./components/Layout";

import { BranchAndBoundExample } from "./components/BranchAndBoundExample";
import { SimplexMethodExample } from "./components/SimplexMethodExample";
import { TabGroup } from "./components/UI/TabGroup";
import { TabLabel } from "./components/UI/TabLabel";
import { TabList } from "./components/UI/TabList";
import { TabPanels } from "./components/UI/TabPanels";
import { TabPanel } from "./components/UI/TabPanel";

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
          <TabPanel>Content 1</TabPanel>
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
