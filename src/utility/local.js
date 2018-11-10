// @flow

type Range = (start : number, end : number) => Array<number>;

export const range : Range = (start, end) => {
  const list = [];

  let iterator = start;

  list.push(start);

  while (iterator - 1 >= end) {
    iterator -= 1;

    list[list.length] = iterator;
  }

  return list;
};
