const SOLUTION_PRECISION = 2;

export const gcd = (a: number, b: number): number => {
  if (!b) {
    return a;
  }
  return gcd(b, a % b);
};

export const getFractionPart = (a: number) => a - Math.floor(a);

export const getPositiveRemainder = (dividend: number, divisor: number) => {
  const remainder = dividend % divisor;
  return remainder >= 0 ? remainder : divisor + remainder;
};

export const insert = <T>(array: T[], newElement: T, position: number): T[] => {
  return [...array.slice(0, position), newElement, ...array.slice(position)];
};

export const remove = <T>(array: T[], position: number): T[] => {
  return [...array.slice(0, position), ...array.slice(position + 1)];
};

export const getSolutionObject = (varNameColumn: string[], values: number[]): Record<string, number> => {
  if (varNameColumn.length !== values.length) {
    throw new Error("Variables and values arrays lengths are not equal");
  }

  return varNameColumn
    .map((varName, idx) => ({ varName, value: values[idx] }))
    .filter(({ varName }) => varName.startsWith("x"))
    .reduce((previous, { varName, value }) => ({ ...previous, [varName]: value }), {});
};

export const camel2title = (camelCase: string) =>
  camelCase
    .replace(/([A-Z])/g, (match) => ` ${match}`)
    .replace(/^./, (match) => match.toUpperCase())
    .trim();

export const getSolutionAsString = (varNameColumn: string[], values: number[]) => {
  if (varNameColumn.length !== values.length) {
    throw new Error("Variables and values arrays lengths are not equal");
  }

  return varNameColumn
    .map((varName, idx) => ({ varName, value: values[idx] }))
    .filter(({ varName }) => varName.startsWith("x"))
    .sort((a, b) => a.varName.localeCompare(b.varName))
    .map(({ varName, value }) => `${varName} = ${value.toFixed(SOLUTION_PRECISION)}`)
    .join(", ");
};

export const maxElement = <T>(array: T[], isLarger: (a: T, b: T) => boolean): T => {
  if (array.length === 0) {
    throw new Error("Can't find the max element in an empty array");
  }

  return array.reduce((previous: T, current: T) => (isLarger(current, previous) ? current : previous), array[0]);
};

export const range = (length: number, start: number = 0) => new Array(length).fill(null).map((_, idx) => start + idx);

export const fill = (length: number, filler: number = 0) => new Array(length).fill(null).map(() => filler);

export const getTerm = (isFirstTerm: boolean, varName: string, value: number) =>
  isFirstTerm && Math.sign(value) > 0
    ? `${getCoefficient(value)} ${varName}`
    : `${getSign(value)} ${getCoefficient(value)} ${varName}`;

export const getSign = (value: number) => `${Math.sign(value) === 1 ? "+" : "-"}`;

export const getCoefficient = (value: number) => `${Math.abs(value) === 1 ? "" : Math.abs(value)}`;
