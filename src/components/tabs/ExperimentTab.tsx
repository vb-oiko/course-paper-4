import React from "react";
import { useSelector } from "react-redux";
import {
  selectExperimentData,
  selectExperimentSourceData,
  selectResultHeader,
  selectSourceHeader,
} from "../../rdx/selectors";
import { ExperimentChart } from "../experiment/ExperimentChart";
import { ExperimentSelect } from "../experiment/ExperimentSelect";
import { ExperimentTable } from "../experiment/ExperimentTable";

export const ExperimentTab: React.FC = () => {
  const experimentData = useSelector(selectExperimentData);
  const sourceData = useSelector(selectExperimentSourceData);
  const resultHeader = useSelector(selectResultHeader);
  const sourceHeader = useSelector(selectSourceHeader);

  return (
    <div className="mb-4">
      <h2 className="mt-8 mb-2 text-lg font-medium">Оберіть експеримент та параметр, що буде змінюватися</h2>
      <ExperimentSelect />
      {sourceData && (
        <>
          <h2 className="mt-8 mb-4"> {sourceHeader}</h2>
          <ExperimentTable experimentData={sourceData} className="w-full" />
        </>
      )}
      {experimentData && (
        <>
          <h2 className="mt-8 mb-4">Таблиця {resultHeader}</h2>
          <ExperimentTable experimentData={experimentData} className="w-full" />
          <h2 className="mt-8 mb-2">Графік {resultHeader}</h2>
          <ExperimentChart experimentData={experimentData} />
        </>
      )}
    </div>
  );
};
