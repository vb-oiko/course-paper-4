import { MAX_ITERATIONS } from "../../const";
import { Tableau } from "../Tableau";
import { solveByTwoPhaseMethod } from "./solveByTwoPhaseMethod";

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

  return showAllTableaus ? resultTableaus : [currentTableau];
};
