import { MAX_ITERATIONS } from "../../const";
import { Tableau } from "../Tableau";

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
