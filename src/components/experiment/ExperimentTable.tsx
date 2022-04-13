import React from "react";
import { ExperimentData } from "../../core/experiment";

export interface ExperimentTableProps {
  experimentData: ExperimentData;
  className?: string;
}

const tableClasses = "border border-gray-900 py-0.5 px-1 text-center";

export const ExperimentTable: React.FC<ExperimentTableProps> = ({ experimentData, className }) => {
  const { labels, datasets } = experimentData;

  return (
    <table className={`border-collapse ${className}`}>
      <thead>
        <tr>
          <th className={tableClasses}></th>
          {labels.map((label) => (
            <th key={label} className={tableClasses}>
              {label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {datasets.map((dataset) => (
          <tr key={dataset.label}>
            <td key={`cell-${dataset.label}-header`} className={tableClasses}>
              {dataset.label}
            </td>
            {dataset.data.map((item, index) => (
              <td key={`cell-${dataset.label}-${index}-${item}`} className={tableClasses}>
                {item}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
