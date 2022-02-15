import { Tableau } from "./Tableau";

const MAX_ITERATIONS = 20;

export const solveByGomoryMethod = (
  tableau: Tableau,
  maxIterations: number = MAX_ITERATIONS,
  showAllTableaus: boolean = false
): Tableau[] => {
  let iterations = 0;
  let currentTableau = tableau;
  let nextTableau = tableau;
  let resultTableaus = [tableau];
  do {
    const tableaus = solveByTwoPhaseMethod(
      nextTableau,
      maxIterations,
      showAllTableaus
    );
    if (!tableaus.length) {
      break;
    }
    if (showAllTableaus) {
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
  } while (iterations < maxIterations);

  return showAllTableaus
    ? [...resultTableaus, currentTableau]
    : [currentTableau];
};

export const solveByTwoPhaseMethod = (
  tableau: Tableau,
  maxIterations: number = MAX_ITERATIONS,
  showAllTableaus: boolean = false
): Tableau[] => {
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
  } while (iterations < maxIterations && nextTableau !== null);

  return showAllTableaus ? tableaus : [tableaus[tableaus.length - 1]];
};
