import React from "react";
import { useSelector } from "react-redux";
import { selectExperimentData, selectExperimentHeaders, selectExperimentSourceData } from "../../rdx/selectors";
import { ExperimentChart } from "../experiment/ExperimentChart";
import { ExperimentSelect } from "../experiment/ExperimentSelect";
import { ExperimentTable } from "../experiment/ExperimentTable";

export interface ExperimentHeaders {
  resultHeader: string;
  sourceHeader: string;
  cornerCell: string;
}

export const ExperimentTab: React.FC = () => {
  const experimentData = useSelector(selectExperimentData);
  const sourceData = useSelector(selectExperimentSourceData);
  const { resultHeader, sourceHeader, cornerCell } = useSelector(selectExperimentHeaders);

  return (
    <div className="mb-4">
      <h2 className="mt-8 mb-2 text-lg font-medium">Оберіть експеримент та параметр, що буде змінюватися</h2>
      <ExperimentSelect />
      {sourceData && (
        <>
          <h2 className="mt-8 mb-4"> {sourceHeader}</h2>
          <ExperimentTable experimentData={sourceData} className="w-full" cornerCell={cornerCell} />
        </>
      )}
      {experimentData && (
        <>
          <h2 className="mt-8 mb-4">Таблиця {resultHeader}</h2>
          <ExperimentTable experimentData={experimentData} className="w-full" cornerCell={cornerCell} />
          <h2 className="mt-8 mb-2">Графік {resultHeader}</h2>
          <ExperimentChart experimentData={experimentData} />
        </>
      )}
    </div>
  );
};
