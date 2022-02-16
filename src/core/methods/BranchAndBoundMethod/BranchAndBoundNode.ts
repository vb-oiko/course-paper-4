import { Tableau, TableauRow } from "../../Tableau";
import { getFractionPart, getSolutionObject } from "../../utils";
import { solveByTwoPhaseMethod } from "../solveByTwoPhaseMethod";

export class BranchAndBoundNode {
  sourceTableau: Tableau;
  targetTableau: Tableau;
  upperBound: number;
  LowerBound: number;
  isSolutionFeasible: boolean;
  isEndingNode: boolean;
  optimalSolution: Record<string, number>;
  integerSolution: Record<string, number>;
  varWithLargestFraction: [string, number];

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

    this.optimalSolution = getSolutionObject(
      this.targetTableau.varColumn,
      this.targetTableau.solution
    );

    this.integerSolution = getSolutionObject(
      this.targetTableau.varColumn,
      this.getIntegerSolution()
    );

    this.varWithLargestFraction = this.getVarWithLargestFraction();

    console.warn(this.getBranchedNodes());
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

        const rowIdx = this.targetTableau.getRowIndexByVarName(varName);

        if (rowIdx === null) {
          return 0;
        }

        return -targetRow[colIdx] * solution[rowIdx];
      })
      .reduce((current, previous) => current + previous, 0);
  }

  getVarWithLargestFraction() {
    return Object.entries(this.optimalSolution).reduce((a, b) =>
      getFractionPart(a[1]) > getFractionPart(b[1]) ? a : b
    );
  }

  getBranchedNodes() {
    const [varName, value] = this.varWithLargestFraction;

    const upperValue = Math.ceil(value);
    const lowerValue = Math.floor(value);

    const upperBoundRow = this.createNewEquationRow(varName, upperValue, -1);
    const lowerBoundRow = this.createNewEquationRow(varName, lowerValue, 1);

    const upperBoundTableau = this.targetTableau.addEquation(
      upperBoundRow,
      "s"
    );
    const lowerBoundTableau = this.targetTableau.addEquation(
      lowerBoundRow,
      "s"
    );

    return [upperBoundTableau, lowerBoundTableau];
  }

  createNewEquationRow(
    varName: string,
    value: number,
    slackVarValue: number
  ): TableauRow {
    const columnIdx = this.targetTableau.getColumnIndexByVarName(varName);
    const newRowLength = this.targetTableau.varRow.length + 2;

    return new Array(newRowLength).fill(null).map((_, idx) => {
      if (idx === columnIdx) {
        return 1;
      }

      if (idx === newRowLength - 3) {
        return slackVarValue;
      }

      if (idx === newRowLength - 1) {
        return value;
      }

      return 0;
    });
  }

  getTableaus(): Tableau[] {
    return [this.sourceTableau, this.targetTableau, ...this.getBranchedNodes()];
  }
}
