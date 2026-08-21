import {describe, expect, it} from 'vitest';
import {isDefined} from '../src/isDefined';

describe('isDefined', () => {
  it('rejects null and undefined', () => {
    expect(isDefined(null)).toBe(false);
    expect(isDefined(undefined)).toBe(false);
    expect(isDefined()).toBe(false);
  });

  it('accepts falsy-but-defined values', () => {
    expect(isDefined(0)).toBe(true);
    expect(isDefined('')).toBe(true);
    expect(isDefined(false)).toBe(true);
    expect(isDefined(NaN)).toBe(true);
  });

  it('accepts objects and arrays', () => {
    expect(isDefined({})).toBe(true);
    expect(isDefined([])).toBe(true);
  });

  it('narrows the type when used as a filter predicate', () => {
    const mixed: (number | null | undefined)[] = [1, null, 2, undefined, 0];
    const filtered: number[] = mixed.filter(isDefined);
    expect(filtered).toEqual([1, 2, 0]);
  });
});
