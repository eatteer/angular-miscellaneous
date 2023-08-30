import { add, sort } from './index';

describe('Index', () => {
  it('2 + 5 should return 7', () => {
    expect(add(2, 5)).toBe(7);
  });

  it('on mode asc [1, 5, 2, 1, 5] should return [1, 1, 2, 5, 5]', () => {
    expect(sort([1, 5, 2, 1, 5], 'asc')).toEqual([1, 1, 2, 5, 5]);
  });

  it('on mode desc [1, 5, 2, 1, 5] should return [5, 5, 2, 1, 1]', () => {
    expect(sort([1, 5, 2, 1, 5], 'desc')).toEqual([5, 5, 2, 1, 1]);
  });
});
