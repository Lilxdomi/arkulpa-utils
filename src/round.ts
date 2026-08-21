/**
 * Rounds a number to a fixed number of decimal places.
 *
 * Uses `toFixed` internally, so it inherits binary floating-point behaviour:
 * `round(1.005, 2)` returns `1`, not `1.01`, because the stored value is
 * `1.00499999…`. Do not use for money — store integer minor units instead.
 *
 * @param value - The number to round.
 * @param decimals - Decimal places to keep. Must be 0–100, or `toFixed` throws a `RangeError`.
 * @returns The rounded number, with trailing zeros dropped (`round(1, 2)` → `1`, not `1.00`).
 */
export const round = (value: number, decimals: number): number => {
  return Number(value.toFixed(decimals));
};
