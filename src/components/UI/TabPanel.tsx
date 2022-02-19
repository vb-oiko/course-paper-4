import { Tab } from "@headlessui/react";
import classNames from "classnames";

export const TabPanel: React.FC = ({ children }) => (
  <Tab.Panel
    className={classNames(
      "bg-white rounded-xl p-3",
      "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60"
    )}
  >
    {children}
  </Tab.Panel>
);
