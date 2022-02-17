import { DecimalCalculationStrategy } from "../core/CalculationStrategy/DecimalCalculationStrategy";
import { GdcCalculationStrategy } from "../core/CalculationStrategy/GdcCalculationStrategy";
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
  calculationStrategy: GdcCalculationStrategy,
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
  calculationStrategy: GdcCalculationStrategy,
});

export const sampleTableau3 = new Tableau({
  varRow: ["x", "y", "z", "s", "t", "u", "v", "p"],
  rows: [
    [3, 1, 3, 1, 0, 0, 0, 0, 80],
    [-1, 4, 3, 0, -1, 0, 0, 0, 20],
    [-1, -1, 3, 0, 0, -1, 0, 0, 20],
    [5, 8, 2, 0, 0, 0, -1, 0, 30],
    [5, 2, 2, 0, 0, 0, 0, 1, 0],
  ],
  varColumn: ["s", "t", "u", "v", "p"],
  varCount: 8,
  equationCount: 4,
  calculationStrategy: GdcCalculationStrategy,
});

export const sampleTableau4 = new Tableau({
  varRow: [
    "x_{11}",
    "x_{12}",
    "x_{13}",
    "x_{14}",
    "x_{15}",
    "x_{21}",
    "x_{22}",
    "x_{23}",
    "x_{24}",
    "x_{25}",
    "x_{31}",
    "x_{32}",
    "x_{33}",
    "x_{34}",
    "x_{35}",
    "x",
    "s_1",
    "s_2",
    "s_3",
    "s_4",
    "s_5",
    "s_6",
    "s_7",
    "s_8",
    "p",
  ],
  rows: [
    [
      200, 100, 300, 50, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, -1, 0, 0, 0, 0,
      0, 0, 0, 0, 0,
    ],
    [
      0, 0, 0, 0, 0, 70, 100, 300, 100, 400, 0, 0, 0, 0, 0, -4, 0, -1, 0, 0, 0,
      0, 0, 0, 0, 0,
    ],
    [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 60, 150, 100, 300, 500, -2, 0, 0, -1, 0, 0,
      0, 0, 0, 0, 0,
    ],
    [
      1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0,
      10,
    ],
    [
      0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0,
      4,
    ],
    [
      0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0,
      60,
    ],
    [
      0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0,
      7,
    ],
    [
      0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0,
      5,
    ],
    [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0,
      1, 0,
    ],
  ],
  varColumn: ["s_1", "s_2", "s_3", "s_4", "s_5", "s_6", "s_7", "s_8", "p"],
  varCount: 25,
  equationCount: 8,
  calculationStrategy: GdcCalculationStrategy,
});

export const sampleTableau5 = new Tableau({
  varRow: ["x_1", "x_2", "s_1", "s_2", "p"],
  rows: [
    [6, 5, 1, 0, 0, 20],
    [2, 3, 0, 1, 0, 10],
    [-1, -1, 0, 0, 1, 0],
  ],
  varColumn: ["s_1", "s_2", "p"],
  varCount: 5,
  equationCount: 2,
  calculationStrategy: GdcCalculationStrategy,
});

export const sampleTableau6 = new Tableau({
  varRow: ["x_1", "x_2", "s_1", "s_2", "s_3", "p"],
  rows: [
    [5, 2, 1, 0, 0, 0, 14],
    [2, 5, 0, 1, 0, 0, 16],
    [1, 0, 0, 0, -1, 0, 3],
    [-3, -5, 0, 0, 0, 1, 0],
  ],
  varColumn: ["s_1", "s_2", "s_3", "p"],
  varCount: 6,
  equationCount: 3,
  calculationStrategy: GdcCalculationStrategy,
});

export const sampleTableau7 = new Tableau({
  varRow: ["x_1", "x_2", "s_1", "s_2", "p"],
  rows: [
    [8000, 4000, 1, 0, 0, 40000],
    [15, 30, 0, 1, 0, 200],
    [-100, -150, 0, 0, 1, 0],
  ],
  varColumn: ["s_1", "s_2", "p"],
  varCount: 5,
  equationCount: 2,
  calculationStrategy: GdcCalculationStrategy,
});

export const sampleTableau8 = new Tableau({
  varRow: ["x_1", "x_2", "s_1", "s_2", "s_3", "p"],
  rows: [
    [8000, 4000, 1, 0, 0, 0, 40000],
    [15, 30, 0, 1, 0, 0, 200],
    [0, 1, 0, 0, -1, 0, 6],
    [-100, -150, 0, 0, 0, 1, 0],
  ],
  varColumn: ["s_1", "s_2", "s_3", "p"],
  varCount: 6,
  equationCount: 3,
  calculationStrategy: GdcCalculationStrategy,
});
