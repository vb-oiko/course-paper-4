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
