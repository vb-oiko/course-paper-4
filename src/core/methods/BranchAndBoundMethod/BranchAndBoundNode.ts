import { Tableau, TableauRow } from "../../Tableau";
import { getFractionPart, getSolutionAsString, getSolutionObject, insert } from "../../utils";
import { solveByTwoPhaseMethod } from "../solveByTwoPhaseMethod";

export type BranchAndBoundNodeTableauType =
  | "sourceTableau"
  | "targetTableau"
  | "upperBoundTableau"
  | "lowerBoundTableau";

export class BranchAndBoundNode {
  id: number;
  sourceTableau: Tableau;
  targetTableau: Tableau;
  tableaus: Tableau[];
  upperBound: number;
  lowerBound: number;
  isSolutionFeasible: boolean;
  isBranchingPossible: boolean;
  isBranchingDone: boolean;
  optimalSolution: string;
  bestIntegerSolution: string;
  varWithLargestFraction: [string, number];
  newConstraints: string;
  isSolutionInteger: boolean;
  comments: (string | number)[];

  constructor(tableau: Tableau, nodeId: number, lowerBound?: number, bestIntegerSolution?: string) {
    this.id = nodeId;
    this.sourceTableau = tableau;
    const tableaus = [tableau, ...solveByTwoPhaseMethod(this.sourceTableau, undefined, true)];

    this.targetTableau = tableaus[tableaus.length - 1];
    this.tableaus = tableaus;
    this.isSolutionFeasible = this.targetTableau.feasible;

    this.upperBound = this.isSolutionFeasible ? this.getTargetFunctionValue(this.targetTableau.solution) : 0;

    this.lowerBound = this.selectLowerBound(lowerBound);

    this.optimalSolution = getSolutionAsString(this.targetTableau.varColumn, this.targetTableau.solution);

    this.bestIntegerSolution = bestIntegerSolution
      ? bestIntegerSolution
      : getSolutionAsString(this.targetTableau.varColumn, this.getIntegerSolution());

    this.newConstraints = "";
    this.varWithLargestFraction = this.getVarWithLargestFraction();
    this.isSolutionInteger = this.checkIfSolutionInteger();
    this.isBranchingPossible = this.isSolutionFeasible && !this.isSolutionInteger && this.upperBound > this.lowerBound;
    this.comments = [];
    this.isBranchingDone = false;
  }

  selectLowerBound(lowerBound?: number): number {
    if (lowerBound) {
      return lowerBound;
    }
    if (this.isSolutionFeasible) {
      return this.getTargetFunctionValue(this.getIntegerSolution());
    }
    return 0;
  }

  getIntegerSolution() {
    return this.targetTableau.solution.map((value) => Math.floor(value));
  }

  getTargetFunctionValue(solution: number[]) {
    const targetRow = this.sourceTableau.rows[this.sourceTableau.rows.length - 1];

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

  getVarWithLargestFraction(): [string, number] {
    const optimalSolution = getSolutionObject(this.targetTableau.varColumn, this.targetTableau.solution);

    const [varName, value] = Object.entries(optimalSolution).reduce((a, b) =>
      getFractionPart(a[1]) > getFractionPart(b[1]) ? a : b
    );

    this.newConstraints = `${varName} <= ${Math.floor(value)}, ${varName} >= ${Math.ceil(value)}`;

    return [varName, value];
  }

  checkIfSolutionInteger(): boolean {
    const optimalSolution = getSolutionObject(this.targetTableau.varColumn, this.targetTableau.solution);

    return Object.values(optimalSolution).every((value) => getFractionPart(value) === 0);
  }

  getBranchedTableaus() {
    const upperBoundTableau = this.getBranchedTableau(true);
    const lowerBoundTableau = this.getBranchedTableau(false);
    this.isBranchingDone = true;

    return { upperBoundTableau, lowerBoundTableau };
  }

  getBranchedTableau(isUpperConstraint: boolean): Tableau {
    const [varName, value] = this.varWithLargestFraction;

    const boundValue = isUpperConstraint ? Math.ceil(value) : Math.floor(value);

    const boundRow = this.createNewEquationRow(varName, boundValue, isUpperConstraint ? -1 : 1);

    const boundTableau = this.sourceTableau.addEquation(boundRow, "s");
    boundTableau.rows[boundTableau.rows.length - 1] = insert(
      this.sourceTableau.rows[this.sourceTableau.rows.length - 1],
      0,
      -2
    );

    return boundTableau;
  }

  createNewEquationRow(varName: string, value: number, slackVarValue: number): TableauRow {
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
    return this.tableaus;
  }
}
