import React from "react";
import { Tableau } from "../core/Tableau";

export interface TableauComponentProps {
  tableau: Tableau;
}

export const TableauComponent: React.FC<TableauComponentProps> = ({
  tableau,
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
          <tr className={idx === tableau.equationCount ? "border-t" : ""}>
            <td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-900 border-r">
              {tableau.varColumn[idx]}
            </td>
            {row.map((element, jdx) => (
              <td
                className={
                  "px-6 py-2 whitespace-nowrap text-sm  text-gray-900" +
                  (jdx === tableau.varCount ? " border-l" : "")
                }
              >
                {element}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
