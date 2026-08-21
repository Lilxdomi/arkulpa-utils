import {useEffect, useState} from 'react';

/**
 * Returns a copy of `value` that only updates once it has stopped changing for `delay`.
 *
 * Useful for search inputs: debounce the term before firing a request. The timer
 * resets on every change, so the returned value lags behind by at least `delay`.
 *
 * @param value - The value to debounce. Compared by identity, so a new object or
 * array on every render restarts the timer each time.
 * @param delay - Milliseconds to wait after the last change. Defaults to `500`.
 * @returns The most recent value that stayed unchanged for the full delay.
 *
 * @example
 * const debouncedSearch = useDebounce(search, 300);
 * useEffect(() => { void fetchResults(debouncedSearch); }, [debouncedSearch]);
 */
export const useDebounce = <T>(value: T, delay?: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || 500);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
};
