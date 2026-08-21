/**
 * Resolves after a delay — `await` it to pause an async function.
 *
 * @param ms - Milliseconds to wait before resolving.
 * @returns A promise that resolves with no value once the delay has elapsed.
 *
 * @example
 * await sleep(500);
 */
export const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
