import React from "react";
import { ExperimentData } from "../../core/experiment";
import useCopyToClipboard from "../../hooks/useCopyToClipboard";
import { InlineLatex } from "../InlineLatex";

export interface ExperimentTableProps {
  experimentData: ExperimentData;
  className?: string;
  headerClassName?: string;
  cornerCell?: string;
}

const tableClasses = "border border-gray-900 py-0.5 px-1 text-center";

const REMOVE_CLASS_REGEX = /(table|td|th) class=".+?"/g;

export const ExperimentTable: React.FC<ExperimentTableProps> = ({
  experimentData,
  className,
  cornerCell,
  headerClassName,
}: ExperimentTableProps) => {
  const { labels, datasets } = experimentData;

  const tableEl = React.useRef<HTMLTableElement>(null);

  const copyToClipboard = useCopyToClipboard();

  const handleClick = React.useCallback(() => {
    if (tableEl.current) {
      const { outerHTML } = tableEl.current;
      copyToClipboard(outerHTML.replace(REMOVE_CLASS_REGEX, "$1"));
    }
  }, [copyToClipboard]);

  return (
    <table className={`border-collapse cursor-pointer ${className}`} ref={tableEl} onClick={handleClick}>
      <thead>
        <tr>
          <th className={`${tableClasses} w-48 px-4`}>{cornerCell}</th>
          {labels.map((label) => (
            <th key={label} className={`${tableClasses} ${headerClassName}`}>
              {label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {datasets.map((dataset) => (
          <tr key={dataset.label}>
            <td key={`cell-${dataset.label}-header`} className={tableClasses}>
              {dataset.label.includes("{") ? <InlineLatex>{dataset.label}</InlineLatex> : dataset.label}
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
