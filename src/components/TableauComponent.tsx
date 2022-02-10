import React from "react";
import { Tableau, Pivot } from "../core/Tableau";
import cs from "classnames";

export interface TableauComponentProps {
  tableau: Tableau;
  pivot?: Pivot;
}

export const TableauComponent: React.FC<TableauComponentProps> = ({
  tableau,
  pivot,
}) => {
  return (
    <table className="m-4">
      <thead>
        <tr className="border-b">
          <th className="border-r"></th>
          {tableau.varRow.map((variable) => (
            <th
              key={variable}
              className="text-sm font-medium text-gray-900 px-6 py-2 text-center"
            >
              {variable}
            </th>
          ))}
          <th className="text-sm font-medium text-gray-900 px-6 py-2 text-center border-l">
            Ans
          </th>
        </tr>
      </thead>
      <tbody>
        {tableau.rows.map((row, idx) => (
          <tr
            key={idx}
            className={cs({ "border-t": idx === tableau.equationCount })}
          >
            <td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-900 border-r">
              {tableau.varColumn[idx]}
            </td>
            {row.map((element, jdx) => (
              <td
                key={jdx}
                className={cs("px-1 whitespace-nowrap text-sm  text-gray-900", {
                  "border-l": jdx === tableau.varCount,
                })}
              >
                <div
                  className={cs("px-5 py-2", {
                    "border border-red-600":
                      pivot && idx === pivot.row && jdx === pivot.column,
                  })}
                >
                  {element}
                </div>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
