/**
 * Type guard that narrows away `null` and `undefined`.
 *
 * @param value - The value to check.
 * @returns `true` if the value is neither `null` nor `undefined`. Falsy-but-defined
 * values such as `0`, `''` and `false` pass.
 *
 * @example
 * const ids = [1, null, 2, undefined].filter(isDefined); // number[] → [1, 2]
 */
export const isDefined = <T>(value?: T | null): value is T => {
  return value !== null && value !== undefined;
};
