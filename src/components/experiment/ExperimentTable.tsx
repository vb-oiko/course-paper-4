import React from "react";
import { ExperimentData } from "../../core/experiment";

export interface ExperimentTableProps {
  experimentData: ExperimentData;
  className?: string;
}

const tableClasses = "border border-gray-900 py-0.5 px-1 text-center";

export const ExperimentTable: React.FC<ExperimentTableProps> = ({ experimentData, className }) => {
  const { labels, datasets } = experimentData;

  const sortedDatasets = React.useMemo(
    () => datasets.sort((datasetA, datasetB) => (datasetA.label < datasetB.label ? -1 : 1)),
    [datasets]
  );

  return (
    <table className={`border-collapse ${className}`}>
      <thead>
        <tr>
          <th className={tableClasses}></th>
          {labels.map((label) => (
            <th className={tableClasses}>{label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedDatasets.map((dataset) => (
          <tr>
            <td className={tableClasses}>{dataset.label}</td>
            {dataset.data.map((item) => (
              <td className={tableClasses}>{item}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
