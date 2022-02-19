import { Tableau, TableauRow } from ".";

export const getLatexProblemStatement = (tableau: Tableau): string[] => {
  const constraintRows = tableau.rows.slice(0, -1);
  const objectiveFunctionRow = tableau.rows[tableau.rows.length - 1];

  const varCount = tableau.varRow.filter((varName) => varName.startsWith("x")).length;

  const constraints = constraintRows.map((row) => getLatexConstraint(row, tableau.varRow, varCount));

  return constraints;
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

export const getTerm = (isFirstTerm: boolean, varName: string, value: number) =>
  isFirstTerm && Math.sign(value) > 0
    ? `${getCoefficient(value)} ${varName}`
    : `${getSign(value)} ${getCoefficient(value)} ${varName}`;

export const getSign = (value: number) => `${Math.sign(value) === 1 ? "+" : "-"}`;

export const getCoefficient = (value: number) => `${Math.abs(value) === 1 ? "" : Math.abs(value)}`;
