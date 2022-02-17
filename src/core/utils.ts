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

export const getSolutionObject = (
  varNameColumn: string[],
  values: number[]
) => {
  if (varNameColumn.length !== values.length) {
    throw new Error("Variables and values arrays lengths are not equal");
  }

  return varNameColumn
    .map((varName, idx) => ({ varName, value: values[idx] }))
    .filter(({ varName }) => varName.startsWith("x"))
    .reduce(
      (previous, { varName, value }) => ({ ...previous, [varName]: value }),
      {}
    );
};

export const camel2title = (camelCase: string) =>
  camelCase
    .replace(/([A-Z])/g, (match) => ` ${match}`)
    .replace(/^./, (match) => match.toUpperCase())
    .trim();
