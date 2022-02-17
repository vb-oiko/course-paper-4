import React from "react";
import cs from "classnames";

export interface CollapseProps {
  buttonTitle: string;
  collapsed?: boolean;
}

export const Collapse: React.FC<CollapseProps> = ({
  buttonTitle,
  children,
  collapsed = false,
}) => {
  const [isCollapsed, setIsCollapsed] = React.useState(collapsed);

  const toggleCollapsed = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      <p className="md:space-x-1 space-y-1 md:space-y-0 mb-4">
        <button
          className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
          type="button"
          aria-expanded={!isCollapsed}
          aria-controls="collapseExample"
          onClick={toggleCollapsed}
        >
          {buttonTitle}
        </button>
      </p>
      <div className={cs({ hidden: isCollapsed })} id="collapseExample">
        <div className="block p-6 rounded-lg shadow-lg bg-white">
          {children}
        </div>
      </div>
    </>
  );
};
