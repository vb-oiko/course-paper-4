import { Tableau } from "./Tableau";

const MAX_ITERATIONS = 20;

export const solve = (tableau: Tableau): Tableau[] => {
  const tableaus = solveByTwoPhaseMethod(tableau);

  const lastTableau = tableaus[tableaus.length - 1];

  const rowForCuttingPlane = lastTableau.selectRowForCuttingPlane();

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
