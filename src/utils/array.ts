export const isLast = (index: number, input: any[]) =>
  index === input.length - 1;
export const getLast = <T>(input: T[]) => input[input.length - 1];
