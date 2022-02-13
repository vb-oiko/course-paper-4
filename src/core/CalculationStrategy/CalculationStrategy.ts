import { TableauRow } from "../Tableau";

export interface CalculationStrategy {
  pivot(
    rows: TableauRow[],
    pivotRowIdx: number,
    pivotColumnIdx: number
  ): TableauRow[];

  createCuttingPlaneRow(row: TableauRow, varCoeff: number): TableauRow;
}
