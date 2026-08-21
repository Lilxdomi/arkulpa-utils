import {describe, expect, it} from 'vitest';
import {round} from '../src/round';

describe('round', () => {
  it('rounds to the requested number of decimals', () => {
    expect(round(1.2345, 2)).toBe(1.23);
    expect(round(1.2355, 2)).toBe(1.24);
    expect(round(1.5, 0)).toBe(2);
  });

  it('drops trailing zeros', () => {
    expect(round(1, 2)).toBe(1);
    expect(round(1.5, 2)).toBe(1.5);
  });

  it('rounds negatives away from zero at the midpoint', () => {
    expect(round(-1.5, 0)).toBe(-2);
    expect(round(-1.2345, 2)).toBe(-1.23);
  });

  it('propagates NaN and Infinity rather than masking them', () => {
    expect(round(NaN, 2)).toBeNaN();
    expect(round(Infinity, 2)).toBe(Infinity);
  });

  // Documented toFixed behaviour: 1.005 is stored as 1.00499999…, so it rounds down.
  it('inherits binary floating-point rounding', () => {
    expect(round(1.005, 2)).toBe(1);
    expect(round(2.675, 2)).toBe(2.67);
  });

  it('throws when decimals is out of range', () => {
    expect(() => round(1, 101)).toThrow(RangeError);
  });
});
