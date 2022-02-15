import { Tableau } from "../../Tableau";
import { solveByTwoPhaseMethod } from "../solveByTwoPhaseMethod";

export class BranchAndBoundNode {
  sourceTableau: Tableau;
  targetTableau: Tableau;
  upperBound: number;
  LowerBound: number;
  isSolutionFeasible: boolean;
  isEndingNode: boolean;

  constructor(tableau: Tableau) {
    this.sourceTableau = tableau;
    const [targetTableau] = solveByTwoPhaseMethod(
      this.sourceTableau,
      undefined,
      false
    );

    this.targetTableau = targetTableau;
    this.isSolutionFeasible = targetTableau.feasible;
    this.isEndingNode = !this.isSolutionFeasible;

    this.upperBound = this.isSolutionFeasible
      ? this.getTargetFunctionValue(this.targetTableau.solution)
      : 0;

    this.LowerBound = this.isSolutionFeasible
      ? this.getTargetFunctionValue(this.getIntegerSolution())
      : 0;
  }

  getIntegerSolution() {
    return this.targetTableau.solution.map((value) => Math.floor(value));
  }

  getTargetFunctionValue(solution: number[]) {
    const targetRow =
      this.sourceTableau.rows[this.sourceTableau.rows.length - 1];

    return this.targetTableau.varRow
      .map((varName, colIdx) => {
        if (!varName.startsWith("x")) {
          return 0;
        }

        const rowIdx = this.targetTableau.varColumn.findIndex(
          (solutionVarName) => solutionVarName === varName
        );

        if (rowIdx === -1) {
          return 0;
        }

        return -targetRow[colIdx] * solution[rowIdx];
      })
      .reduce((current, previous) => current + previous, 0);
  }
}
