import React from "react";
import { Tableau, Pivot } from "../core/Tableau";
import cs from "classnames";

export interface TableauComponentProps {
  tableau: Tableau;
}

export const TableauComponent: React.FC<TableauComponentProps> = ({
  tableau,
}) => {
  const pivot = tableau.pivot();

  return (
    <div className="flex flex-col m-4">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-x-auto">
            <table className="min-w-full">
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
                    className={cs({
                      "border-t": idx === tableau.equationCount,
                    })}
                  >
                    <td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-900 border-r">
                      {`${tableau.starredRows[idx] ? "*" : ""}${
                        tableau.varColumn[idx]
                      } = ${tableau.solution[idx].toFixed(3)}`}
                    </td>
                    {row.map((element, jdx) => (
                      <td
                        key={jdx}
                        className={cs(
                          "px-1 whitespace-nowrap text-sm  text-gray-900",
                          {
                            "border-l": jdx === tableau.varCount,
                          }
                        )}
                      >
                        <div
                          className={cs("px-5 py-2", {
                            "border border-red-600":
                              pivot &&
                              idx === pivot.row &&
                              jdx === pivot.column,
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
          </div>
        </div>
      </div>
    </div>
  );
};
