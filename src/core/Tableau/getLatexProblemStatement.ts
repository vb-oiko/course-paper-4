import { Tableau, TableauRow } from ".";
import { getTerm } from "../utils";

export const getLatexProblemStatement = (tableau: Tableau) => {
  const constraintRows = tableau.rows.slice(0, -1);
  const objectiveFunctionRow = tableau.rows[tableau.rows.length - 1];
  const varCount = tableau.varRow.filter((varName) => varName.startsWith("x")).length;
  const constraints = constraintRows.map((row) => getLatexConstraint(row, tableau.varRow, varCount));
  const objectiveFunction = getLatexObjectiveFunction(
    objectiveFunctionRow.map((value) => -value),
    tableau.varRow,
    varCount
  );
  return { objectiveFunction, constraints };
};

export const getLatexObjectiveFunction = (row: TableauRow, varRow: string[], nonSlackVarCount: number): string => {
  const chunks: string[] = [];

  row.forEach((cell, idx) => {
    if (idx < nonSlackVarCount && cell !== 0) {
      chunks.push(getTerm(!chunks.length, varRow[idx], cell));
    }
  });

  return chunks.join(" ");
};

export const getLatexConstraint = (row: TableauRow, varRow: string[], nonSlackVarCount: number): string => {
  const chunks: string[] = [];

  row.forEach((cell, idx) => {
    if (idx < nonSlackVarCount && cell !== 0) {
      chunks.push(getTerm(!chunks.length, varRow[idx], cell));
      return;
    }

    if (idx === row.length - 1) {
      chunks.push(String(cell));
      return;
    }

    if (cell === 1) {
      chunks.push("\\le");
      return;
    }

    if (cell === -1) {
      chunks.push("\\ge");
      return;
    }
  });

  return chunks.join(" ");
};
