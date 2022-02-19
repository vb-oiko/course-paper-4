import { Tab } from "@headlessui/react";

export const TabList: React.FC = ({ children }) => (
  <Tab.List className="flex p-1 space-x-1 bg-blue-900/20 rounded-xl">{children}</Tab.List>
);
