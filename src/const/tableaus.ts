import { Tableau } from "../core/Tableau";

export const sampleTableau1 = new Tableau({
  varRow: ["x", "y", "z", "s", "t", "u", "p"],
  rows: [
    [1, 1, 1, 1, 0, 0, 0, 10],
    [4, -3, 1, 0, 1, 0, 0, 3],
    [2, 1, -1, 0, 0, 1, 0, 10],
    [-2, 3, -1, 0, 0, 0, 1, 0],
  ],
  varColumn: ["s", "t", "u", "p"],
  varCount: 7,
  equationCount: 3,
});

export const sampleTableau2 = new Tableau({
  varRow: ["x", "y", "z", "s", "t", "u", "p"],
  rows: [
    [1, 5, -5, 1, 0, 0, 0, 50],
    [-5, 0, 3, 0, 1, 0, 0, 50],
    [5, 5, 3, 0, 0, 1, 0, 100],
    [-3, -5, 1, 0, 0, 0, 1, 0],
  ],
  varColumn: ["s", "t", "u", "p"],
  varCount: 7,
  equationCount: 3,
});
