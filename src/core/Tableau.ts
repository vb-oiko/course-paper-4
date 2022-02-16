import { CalculationStrategy } from "./CalculationStrategy/CalculationStrategy";
import { getFractionPart, insert, remove } from "./utils";

export type TableauRow = number[];

export interface Pivot {
  column: number | null;
  row: number | null;
}

export class Tableau {
  rows: TableauRow[];
  varRow: string[];
  varColumn: string[];
  varCount: number;
  equationCount: number;
  starredRows: boolean[];
  phase1: boolean;
  solution: number[];
  comments: string[];
  isOptimal: boolean;
  calculationStrategy: CalculationStrategy;
  feasible: boolean;

  constructor(tableau: {
    rows: TableauRow[];
    varRow: string[];
    varColumn: string[];
    varCount: number;
    equationCount: number;
    calculationStrategy: CalculationStrategy;
  }) {
    this.comments = [];
    this.rows = tableau.rows;
    this.equationCount = tableau.equationCount;
    this.varColumn = tableau.varColumn;
    this.varCount = tableau.varCount;
    this.varRow = tableau.varRow;
    this.starredRows = this.getStarredRows();
    this.phase1 = this.checkPhase();
    this.isOptimal = this.checkIfOptimal();
    this.solution = this.getSolution();
    this.calculationStrategy = tableau.calculationStrategy;
    this.feasible = true;
  }

  checkPhase() {
    const isPhase1 = this.starredRows.some((starredRow) => starredRow === true);
    this.comments.push(isPhase1 ? "First phase" : "Second phase");
    return isPhase1;
  }

  getSolution(): number[] {
    return this.varColumn.map((basisVarName, rowIdx) => {
      const columnIdx = this.varRow.findIndex(
        (varName) => varName === basisVarName
      );

      const currentRow = this.rows[rowIdx];

      return currentRow[currentRow.length - 1] / currentRow[columnIdx];
    });
  }

  getStarredRows(): boolean[] {
    return this.varColumn.map((basisVarName, rowIdx) => {
      const columnIdx = this.varRow.findIndex(
        (varName) => varName === basisVarName
      );

      return this.rows[rowIdx][columnIdx] < 0;
    });
  }

  checkIfOptimal(): boolean {
    const isOptimal = this.rows[this.equationCount].every((el) => el >= 0);
    if (!this.phase1) {
      this.comments.push(isOptimal ? "Plan is optimal" : "Plan is not optimal");
    }
    return isOptimal;
  }

  pivotColumn(): number | null {
    if (this.phase1) {
      return this.pivotColumnPhase1();
    }
    return this.pivotColumnPhase2();
  }

  pivotColumnPhase1(): number | null {
    const firstStaredRow = this.rows[this.starredRows.findIndex(Boolean)];

    let value = 0;
    let index: number | null = null;
    for (let i = 0; i < this.varCount; i += 1) {
      if (firstStaredRow[i] > value) {
        value = firstStaredRow[i];
        index = i;
      }
    }
    return index;
  }

  pivotColumnPhase2(): number | null {
    const lastRow = this.rows[this.equationCount];
    let value = 0;
    let index: number | null = null;
    for (let i = 0; i < this.varCount; i += 1) {
      if (lastRow[i] < value) {
        value = lastRow[i];
        index = i;
      }
    }
    return index;
  }

  pivotRow(): number | null {
    return this.pivotRowPhase2();
  }

  pivotRowPhase2(): number | null {
    const pivotColumn = this.pivotColumn();
    if (pivotColumn === null) {
      return null;
    }

    let index: number | null = null;
    let ratio: number | null = null;
    let ratios: { ratio: number; idx: number; starred: boolean }[] = [];

    for (let i = 0; i < this.equationCount; i += 1) {
      if (this.rows[i][pivotColumn] <= 0) {
        continue;
      }

      const currentRatio =
        this.rows[i][this.varCount] / this.rows[i][pivotColumn];
      ratios.push({
        ratio: currentRatio,
        idx: i,
        starred: this.starredRows[i],
      });

      if (ratio === null || currentRatio < ratio) {
        ratio = currentRatio;
        index = i;
      }
    }

    if (this.phase1) {
      const bestRatio = ratios
        .filter((ratio$) => ratio$.ratio === ratio)
        .sort((ratio) => (ratio.starred ? -1 : 1));
      if (bestRatio.length === 0) {
        return null;
      }
      return bestRatio[0].idx;
    }

    return index;
  }

  pivot(): Pivot {
    return {
      row: this.pivotRow(),
      column: this.pivotColumn(),
    };
  }

  findCuttingPlaneVarInBasis() {
    return this.varColumn.find((varName) => varName.startsWith("g"));
  }

  removeCuttingPlaneVarAndCreateNewTableau(varToRemove: string) {
    const columnIdx = this.varRow.findIndex(
      (varName) => varName === varToRemove
    );
    const rowIdx = this.varColumn.findIndex(
      (varName) => varName === varToRemove
    );

    const rows = remove(this.rows, rowIdx).map((row) => remove(row, columnIdx));
    const varRow = remove(this.varRow, columnIdx);
    const varColumn = remove(this.varColumn, rowIdx);
    const varCount = this.varCount - 1;
    const equationCount = this.equationCount - 1;

    return new Tableau({
      rows,
      varRow,
      varColumn,
      varCount,
      equationCount,
      calculationStrategy: this.calculationStrategy,
    });
  }

  next(): Tableau | null {
    const pivotColumnIdx = this.pivotColumn();
    const pivotRowIdx = this.pivotRow();

    if (this.isOptimal && !this.phase1) {
      // this.comments.push("A cutting plane equation should be added");
      const varToRemove = this.findCuttingPlaneVarInBasis();
      if (varToRemove) {
        this.comments.push(
          `Plan includes cutting plane var: ${varToRemove}, removing corresponding row and column`
        );

        return this.removeCuttingPlaneVarAndCreateNewTableau(varToRemove);
      }
      return null;
    }

    if (pivotColumnIdx === null || pivotRowIdx === null) {
      this.comments.push("Cannot select pivot element");
      this.feasible = false;
      return null;
    }

    const rows = this.calculationStrategy.pivot(
      this.rows,
      pivotRowIdx,
      pivotColumnIdx
    );

    const varRow = this.varRow;
    const varColumn = this.varColumn.map((varName, idx) =>
      idx === pivotRowIdx ? varRow[pivotColumnIdx] : varName
    );
    const varCount = this.varCount;
    const equationCount = this.equationCount;

    return new Tableau({
      rows,
      varRow,
      varColumn,
      varCount,
      equationCount,
      calculationStrategy: this.calculationStrategy,
    });
  }

  selectRowForCuttingPlane(): number[] | null {
    let varCoeff = 0;
    let maxRatioRow: number[] | null = null;
    let maxRatio = 0;

    for (let i = 0; i < this.equationCount; i += 1) {
      const row = this.rows[i];
      const planColumnIdx = this.varRow.findIndex(
        (varName) => varName === this.varColumn[i]
      );
      const planVarCoeff = row[planColumnIdx];
      const ratio = getFractionPart(row[this.varCount] / planVarCoeff);
      if (ratio > maxRatio && this.varColumn[i].startsWith("x")) {
        maxRatio = ratio;
        maxRatioRow = row;
        varCoeff = planVarCoeff;
      }
    }

    if (!maxRatioRow) {
      return null;
    }

    return this.calculationStrategy.createCuttingPlaneRow(
      maxRatioRow,
      varCoeff
    );
  }

  createVarName(prefix: string) {
    const maxIdx = Math.max(
      ...this.varRow
        .map((varName) => varName.split("_"))
        .map(([_, index]) => Number(index))
        .filter((idx) => !isNaN(idx))
    );

    return `${prefix}_${maxIdx + 1}`;
  }

  addCuttingPlane(newRow: number[]): Tableau {
    return this.addEquation(newRow, "g");
  }

  addEquation(newRow: number[], varNamePrefix: string): Tableau {
    const newSlackVarName = this.createVarName(varNamePrefix);
    const extendedRows = this.rows.map((row) => insert(row, 0, -2));

    const rows = insert(extendedRows, newRow, -1);

    const varRow = insert(this.varRow, newSlackVarName, -1);

    const varColumn = insert(this.varColumn, newSlackVarName, -1);
    const varCount = this.varCount + 1;
    const equationCount = this.equationCount + 1;

    return new Tableau({
      rows,
      varRow,
      varColumn,
      varCount,
      equationCount,
      calculationStrategy: this.calculationStrategy,
    });
  }

  getColumnIndexByVarName(varName: string): number | null {
    const idx = this.varRow.findIndex((name) => name === varName);
    return idx === -1 ? null : idx;
  }

  getRowIndexByVarName(varName: string): number | null {
    const idx = this.varColumn.findIndex((name) => name === varName);
    return idx === -1 ? null : idx;
  }
}
