export type TableauRow = number[];

export class Tableau implements Tableau {
  rows: TableauRow[];
  varRow: string[];
  varColumn: string[];
  varCount: number;
  equationCount: number;

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
  }

  isOptimal(): boolean {
    return this.rows[this.equationCount].every((el) => el >= 0);
  }

  pivotColumn(): number | null {
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
    const pivotColumn = this.pivotColumn();
    if (pivotColumn === null) {
      return null;
    }

    let index: number | null = null;
    let ratio: number | null = null;

    for (let i = 0; i < this.equationCount; i += 1) {
      if (this.rows[i][pivotColumn] <= 0) {
        continue;
      }

      const currentRatio =
        this.rows[i][this.varCount] / this.rows[i][pivotColumn];

      if (ratio === null || currentRatio < ratio) {
        ratio = currentRatio;
        index = i;
      }
    }

    return index;
  }

  next(): Tableau | undefined {
    return;
  }
}
