export const add = (a: number, b: number) => {
  return a + b;
};

export const sort = (arr: number[], mode: 'asc' | 'desc') => {
  const compareFnForAscending = (a: number, b: number) => a - b;
  const compareFnForDescending = (a: number, b: number) => b - a;

  const compareFns = {
    asc: compareFnForAscending,
    desc: compareFnForDescending,
  };

  return arr.sort(compareFns[mode]);
};
