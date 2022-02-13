import { TableauRow } from "../Tableau";
import { gcd, getPositiveRemainder, insert } from "../utils";
import { CalculationStrategy } from "./CalculationStrategy";

export const GdcCalculationStrategy: CalculationStrategy = {
  pivot(
    rows: TableauRow[],
    pivotRowIdx: number,
    pivotColumnIdx: number
  ): TableauRow[] {
    const pivotValue = rows[pivotRowIdx][pivotColumnIdx];
    const pivotRow = [...rows[pivotRowIdx]];

    return rows.map((row, idx) => {
      if (idx === pivotRowIdx) {
        return pivotRow;
      }

      const absCoefficient = Math.abs(row[pivotColumnIdx]);

      const gcdValue = gcd(pivotValue, absCoefficient);

      const currentRowMultiplier = pivotValue / gcdValue;
      const pivotRowMultiplier = absCoefficient / gcdValue;

      const pivotedRow = row.map((element, jdx) =>
        row[pivotColumnIdx] > 0
          ? currentRowMultiplier * element - pivotRow[jdx] * pivotRowMultiplier
          : currentRowMultiplier * element + pivotRow[jdx] * pivotRowMultiplier
      );

      const gcdRow = pivotedRow.filter((value) => value !== 0).map(Math.abs);
      if (gcdRow.length) {
        const rowGcd = gcdRow.reduce(
          (previous, current) => gcd(previous, current),
          gcdRow[0]
        );

        if (rowGcd > 1) {
          return pivotedRow.map((value) => value / rowGcd);
        }
      }

      return pivotedRow;
    });
  },

  createCuttingPlaneRow(row: TableauRow, varCoeff: number): TableauRow {
    const newRow = row.map((element) =>
      getPositiveRemainder(element, varCoeff)
    );

    return insert(newRow, -varCoeff, -2);
  },
};
