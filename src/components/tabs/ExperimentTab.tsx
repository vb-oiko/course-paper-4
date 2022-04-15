import React from "react";
import { useSelector } from "react-redux";
import { selectExperimentData } from "../../rdx/selectors";
import { ExperimentChart } from "../experiment/ExperimentChart";
import { ExperimentSelect } from "../experiment/ExperimentSelect";
import { ExperimentTable } from "../experiment/ExperimentTable";

export const ExperimentTab: React.FC = () => {
  const experimentData = useSelector(selectExperimentData);

  return (
    <div className="mb-4">
      <ExperimentSelect />
      {experimentData && (
        <div className="mt-4">
          <ExperimentChart experimentData={experimentData} />
          <ExperimentTable experimentData={experimentData} className="mt-8 w-full" />
        </div>
      )}
    </div>
  );
};
