import { gcd, getFractionPart, getPositiveRemainder, insert } from "./utils";

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

  constructor(tableau: {
    rows: TableauRow[];
    varRow: string[];
    varColumn: string[];
    varCount: number;
    equationCount: number;
  }) {
    this.rows = tableau.rows;
    this.equationCount = tableau.equationCount;
    this.varColumn = tableau.varColumn;
    this.varCount = tableau.varCount;
    this.varRow = tableau.varRow;
    this.starredRows = this.getStarredRows();
    this.phase1 = this.starredRows.some((starredRow) => starredRow === true);
    this.solution = this.getSolution();
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

  isOptimal(): boolean {
    return this.rows[this.equationCount].every((el) => el >= 0);
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

  next(): Tableau | null {
    const pivotColumnIdx = this.pivotColumn();
    const pivotRowIdx = this.pivotRow();

    if (
      (this.isOptimal() && !this.phase1) ||
      pivotColumnIdx === null ||
      pivotRowIdx === null
    ) {
      return null;
    }

    const pivotValue = this.rows[pivotRowIdx][pivotColumnIdx];
    const pivotRow = [...this.rows[pivotRowIdx]];

    const rows = this.rows.map((row, idx) => {
      if (idx === pivotRowIdx) {
        return pivotRow;
      }

      const absCoefficient = Math.abs(row[pivotColumnIdx]);

      const gcdValue = gcd(pivotValue, absCoefficient);

      const currentRowMultiplier = pivotValue / gcdValue;
      const pivotRowMultiplier = absCoefficient / gcdValue;

      const pivotedRow = row.map((element, jdx) =>
        row[pivotColumnIdx] > 0
          ? currentRowMultiplier * element - pivotRow[jdx] * pivotRowMultiplier
          : currentRowMultiplier * element + pivotRow[jdx] * pivotRowMultiplier
      );

      const gcdRow = pivotedRow.filter((value) => value !== 0).map(Math.abs);
      if (gcdRow.length) {
        const rowGcd = gcdRow.reduce(
          (previous, current) => gcd(previous, current),
          gcdRow[0]
        );

        if (rowGcd > 1) {
          return pivotedRow.map((value) => value / rowGcd);
        }
      }

      return pivotedRow;
    });

    const varRow = this.varRow;
    const varColumn = this.varColumn.map((varName, idx) =>
      idx === pivotRowIdx ? varRow[pivotColumnIdx] : varName
    );
    const varCount = this.varCount;
    const equationCount = this.equationCount;

    return new Tableau({ rows, varRow, varColumn, varCount, equationCount });
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
      if (ratio > maxRatio) {
        maxRatio = ratio;
        maxRatioRow = row;
        varCoeff = planVarCoeff;
      }
    }

    if (!maxRatioRow) {
      return null;
    }

    const newRow = maxRatioRow.map((element) =>
      getPositiveRemainder(element, varCoeff)
    );

    return insert(newRow, -varCoeff, -2);
  }

  addCuttingPlane(newRow: number[]): Tableau {
    const newSlackVarName = `s_${this.equationCount + 1}`;

    const extendedRows = this.rows.map((row) => insert(row, 0, -2));

    const rows = insert(extendedRows, newRow, -1);

    const varRow = insert(this.varRow, newSlackVarName, -1);

    const varColumn = insert(this.varColumn, newSlackVarName, -1);
    const varCount = this.varCount + 1;
    const equationCount = this.equationCount + 1;

    return new Tableau({ rows, varRow, varColumn, varCount, equationCount });
  }
}
