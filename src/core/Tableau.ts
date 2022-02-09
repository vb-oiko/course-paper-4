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
    return false;
  }

  pivotColumn(): number {
    return 0;
  }

  pivotRow(): number {
    return 0;
  }

  next(): Tableau | undefined {
    return;
  }
}
