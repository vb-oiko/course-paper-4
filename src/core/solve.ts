import { Tableau } from "./Tableau";

const MAX_ITERATIONS = 2500;
const SHOW_ALL_TABLEAUS = false;

export const solve = (tableau: Tableau): Tableau[] => {
  let iterations = 0;
  let currentTableau = tableau;
  let nextTableau = tableau;
  let resultTableaus = [tableau];
  do {
    const tableaus = solveByTwoPhaseMethod(nextTableau);
    if (!tableaus.length) {
      break;
    }
    if (SHOW_ALL_TABLEAUS) {
      resultTableaus.push(...tableaus);
    }

    currentTableau = tableaus[tableaus.length - 1];

    const rowForCuttingPlane = currentTableau.selectRowForCuttingPlane();

    if (!rowForCuttingPlane) {
      currentTableau.comments.push("Cannot find a row for cutting plane");
      break;
    }

    currentTableau.comments.push("Plan is not integer, adding a cutting plane");

    nextTableau = currentTableau.addCuttingPlane(rowForCuttingPlane);
    resultTableaus.push(nextTableau);

    iterations += 1;
  } while (iterations < MAX_ITERATIONS);

  return SHOW_ALL_TABLEAUS ? resultTableaus : [currentTableau];
};

export const solveByTwoPhaseMethod = (tableau: Tableau): Tableau[] => {
  const tableaus = [];

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
