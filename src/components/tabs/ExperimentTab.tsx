import React from "react";
import { useSelector } from "react-redux";
import { selectExperimentData, selectExperimentSourceData } from "../../rdx/selectors";
import { ExperimentChart } from "../experiment/ExperimentChart";
import { ExperimentSelect } from "../experiment/ExperimentSelect";
import { ExperimentTable } from "../experiment/ExperimentTable";

export const ExperimentTab: React.FC = () => {
  const experimentData = useSelector(selectExperimentData);
  const sourceData = useSelector(selectExperimentSourceData);

  return (
    <div className="mb-4">
      <ExperimentSelect />
      {sourceData && <ExperimentTable experimentData={sourceData} className="mt-8 w-full" />}
      {experimentData && (
        <div className="mt-4">
          <ExperimentTable experimentData={experimentData} className="my-8 w-full" />
          <ExperimentChart experimentData={experimentData} />
        </div>
      )}
    </div>
  );
};
