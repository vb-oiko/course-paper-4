import { ReactChild } from "react";
import classNames from "classnames";
import React from "react";

export interface Tab {
  name: string;
  component: ReactChild;
}

export interface TabGroupProps {
  tabs: Tab[];
}

export const TabGroup: React.FC<TabGroupProps> = ({ tabs }) => {
  const [currentTab, setCurrentTab] = React.useState<Tab | undefined>(tabs[0]);

  const handleClick = React.useCallback(
    (name: string) => () => {
      setCurrentTab(tabs.find((tab) => tab.name === name));
    },
    [tabs]
  );

  return (
    <div>
      <div className="border-b border-gray-200 mb-4">
        <div className="-mb-px flex space-x-8" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              onClick={handleClick(tab.name)}
              key={tab.name}
              className={classNames(
                tab.name === currentTab?.name
                  ? "border-indigo-500 text-indigo-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                "whitespace-nowrap py-4 px-1 border-b-2 font-medium"
              )}
              aria-current={tab.name === currentTab?.name ? "page" : undefined}
            >
              {tab.name}
            </button>
          ))}
        </div>
      </div>
      {currentTab && currentTab.component}
    </div>
  );
};
