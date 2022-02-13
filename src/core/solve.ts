import { Tableau } from "./Tableau";

const MAX_ITERATIONS = 20;

export const solve = (tableau: Tableau): Tableau[] => {
  let iterations = 0;
  let currentTableau = null;
  let nextTableau = tableau;
  let resultTableaus = [];
  do {
    const tableaus = solveByTwoPhaseMethod(nextTableau);

    currentTableau = tableaus[tableaus.length - 1];
    resultTableaus.push(currentTableau);

    const rowForCuttingPlane = currentTableau.selectRowForCuttingPlane();

    if (!rowForCuttingPlane) {
      break;
    }

    nextTableau = currentTableau.addCuttingPlane(rowForCuttingPlane);
    resultTableaus.push(nextTableau);

    iterations += 1;
  } while (iterations < 3);

  return resultTableaus;
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
