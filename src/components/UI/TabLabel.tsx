import { Tab } from "@headlessui/react";
import className from "classnames";

export const TabLabel: React.FC = ({ children }) => (
  <Tab
    className={({ selected }) =>
      className(
        "w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg",
        "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60",
        selected ? "bg-white shadow" : "text-blue-500 hover:bg-white/[0.12] hover:text-blue-700"
      )
    }
  >
    {children}
  </Tab>
);
