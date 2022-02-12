import { Tableau } from "./Tableau";
import { getFractionPart, getPositiveRemainder } from "./utils";

const MAX_ITERATIONS = 20;

export const solve = (tableau: Tableau): Tableau[] => {
  const tableaus = solveByTwoPhaseMethod(tableau);

  const lastTableau = tableaus[tableaus.length - 1];

  const rowForCuttingPlane = selectRowForCuttingPlane(lastTableau);

  console.warn({ rowForCuttingPlane });

  return tableaus;
};

export const solveByTwoPhaseMethod = (tableau: Tableau): Tableau[] => {
  const tableaus = [tableau];

  let iterations = 0;
  let currentTableau = tableau;
  let nextTableau = null;
  do {
    nextTableau = currentTableau.next();
    if (nextTableau) {
      tableaus.push(nextTableau);
      currentTableau = nextTableau;
    }
    iterations += 1;
  } while (iterations < MAX_ITERATIONS && nextTableau !== null);

  return tableaus;
};

const selectRowForCuttingPlane = (tableau: Tableau): number[] | null => {
  let varCoeff = 0;
  let maxRatioRow: number[] | null = null;
  let maxRatio = 0;

  for (let i = 0; i < tableau.equationCount; i += 1) {
    const row = tableau.rows[i];
    const planColumnIdx = tableau.varRow.findIndex(
      (varName) => varName === tableau.varColumn[i]
    );
    const planVarCoeff = row[planColumnIdx];
    const ratio = getFractionPart(row[tableau.varCount] / planVarCoeff);
    if (ratio > maxRatio) {
      maxRatio = ratio;
      maxRatioRow = row;
      varCoeff = planVarCoeff;
    }
  }

  return maxRatioRow
    ? maxRatioRow.map((element) => getPositiveRemainder(element, varCoeff))
    : null;
};
