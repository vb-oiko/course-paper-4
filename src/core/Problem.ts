import { GdcCalculationStrategy } from "./CalculationStrategy/GdcCalculationStrategy";
import { Tableau } from "./Tableau";
import { fill, getTerm, range } from "./utils";

export interface Problem {
  a: number[][];
  b: number[];
  p: number[];
}

export const validateProblemData = (problem: Problem) => {
  const { a, b, p } = problem;
  const factoryNumber = b.length;
  const productNumber = p.length;

  if (a.length !== productNumber) {
    throw new Error("Productivity matrix row number doesn't correspond to product number");
  }

  a.forEach((row) => {
    if (row.length !== factoryNumber) {
      throw new Error("Productivity matrix column number doesn't correspond to factory number");
    }
  });
};

export const createVarRow = (factoryNumber: number, productNumber: number) => {
  return [
    ...range(productNumber, 1)
      .map((rowIdx) => range(factoryNumber, 1).map((colIdx) => `x_{${rowIdx}${colIdx}}`))
      .flat(),
    "x",
    ...range(productNumber + factoryNumber, 1).map((idx) => `s_${idx}`),
    "p",
  ];
};

export const createVarColumn = (factoryNumber: number, productNumber: number) => {
  return [...range(factoryNumber + productNumber, 1).map((colIdx) => `s_${colIdx}`), "p"];
};

export const createProductConstraints = (problem: Problem) => {
  const { a, b, p } = problem;
  const factoryNumber = b.length;
  const productNumber = p.length;
  return range(productNumber).map((rowIdx) => [
    ...fill(rowIdx * factoryNumber),
    ...range(factoryNumber).map((colIdx) => a[rowIdx][colIdx]),
    ...fill((productNumber - rowIdx - 1) * factoryNumber),
    -p[rowIdx],
    ...fill(rowIdx),
    -1,
    ...fill(productNumber - rowIdx - 1),
    ...fill(factoryNumber + 1),
    p[rowIdx],
  ]);
};

export const createFactoryConstraints = (problem: Problem) => {
  const { b, p } = problem;
  const factoryNumber = b.length;
  const productNumber = p.length;

  return range(factoryNumber).map((rowIdx) => [
    ...range(productNumber)
      .map(() => [...fill(rowIdx), 1, ...fill(factoryNumber - rowIdx - 1)])
      .flat(),
    0,
    ...fill(productNumber),
    ...fill(rowIdx),
    1,
    ...fill(factoryNumber - rowIdx - 1),
    0,
    b[rowIdx],
  ]);
};

export const createObjectiveFunctionConstraint = (problem: Problem) => {
  const { b, p } = problem;
  const factoryNumber = b.length;
  const productNumber = p.length;

  return [...fill(factoryNumber * productNumber), -1, ...fill(factoryNumber + productNumber), 1, 0];
};

export const getTableauFromProblem = (problem: Problem) => {
  validateProblemData(problem);

  const { b, p } = problem;
  const factoryNumber = b.length;
  const productNumber = p.length;

  const varRow = createVarRow(factoryNumber, productNumber);
  const varColumn = createVarColumn(factoryNumber, productNumber);

  const rows = [
    ...createProductConstraints(problem),
    ...createFactoryConstraints(problem),
    createObjectiveFunctionConstraint(problem),
  ];

  return new Tableau({
    rows,
    varRow,
    varColumn,
    varCount: varRow.length,
    equationCount: factoryNumber + productNumber,
    calculationStrategy: GdcCalculationStrategy,
  });
};

export const getLatexFromProblem = (problem: Problem) => {
  const { a, b, p } = problem;
  const factoryNumber = b.length;
  const productNumber = p.length;

  const objectiveFunction = "x \\rightarrow \\max";

  const productConstraints = a.map((row, rowIdx) =>
    [
      ...row.map((coefficient, colIdx) => getTerm(colIdx === 0, `x_{${rowIdx + 1}${colIdx + 1}}`, coefficient)),
      getTerm(false, "x", -p[rowIdx]),
      "\\ge 0",
    ].join("")
  );

  const factoryConstraints = range(factoryNumber).map((colIdx) =>
    [
      ...range(productNumber).map((rowIdx) => getTerm(rowIdx === 0, `x_{${rowIdx + 1}${colIdx + 1}}`, 1)),
      "\\le",
      String(b[colIdx]),
    ].join(" ")
  );

  return [objectiveFunction, ...productConstraints, ...factoryConstraints];
};
