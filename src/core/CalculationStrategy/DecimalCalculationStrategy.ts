import { TableauRow } from "../Tableau";
import { gcd, getPositiveRemainder, insert } from "../utils";
import { CalculationStrategy } from "./CalculationStrategy";

export const DecimalCalculationStrategy: CalculationStrategy = {
  pivot(
    rows: TableauRow[],
    pivotRowIdx: number,
    pivotColumnIdx: number
  ): TableauRow[] {
    const pivotValue = rows[pivotRowIdx][pivotColumnIdx];
    const pivotRow = rows[pivotRowIdx].map((value) => value / pivotValue);

    return rows.map((row, idx) => {
      if (idx === pivotRowIdx) {
        return pivotRow;
      }

      return row.map(
        (element, jdx) => element - pivotRow[jdx] * row[pivotColumnIdx]
      );
    });
  },

  createCuttingPlaneRow(row: TableauRow, varCoeff: number): TableauRow {
    const newRow = row.map((element) =>
      getPositiveRemainder(element, varCoeff)
    );

    return insert(newRow, -varCoeff, -2);
  },
};
