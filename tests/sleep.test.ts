import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import {sleep} from '../src/sleep';

describe('sleep', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it('does not resolve before the delay has elapsed', async () => {
    let resolved = false;
    void sleep(500).then(() => (resolved = true));

    await vi.advanceTimersByTimeAsync(499);
    expect(resolved).toBe(false);

    await vi.advanceTimersByTimeAsync(1);
    expect(resolved).toBe(true);
  });

  it('resolves with undefined', async () => {
    const promise = sleep(10);
    await vi.advanceTimersByTimeAsync(10);
    await expect(promise).resolves.toBeUndefined();
  });

  it('resolves immediately for a zero delay', async () => {
    let resolved = false;
    void sleep(0).then(() => (resolved = true));

    await vi.advanceTimersByTimeAsync(0);
    expect(resolved).toBe(true);
  });
});
