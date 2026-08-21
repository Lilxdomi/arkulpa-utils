// @vitest-environment jsdom
import {act, renderHook} from '@testing-library/react';
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import {useDebounce} from '../../src/react/useDebounce';

describe('useDebounce', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it('returns the initial value immediately', () => {
    const {result} = renderHook(() => useDebounce('a', 500));
    expect(result.current).toBe('a');
  });

  it('holds the old value until the delay elapses', () => {
    const {result, rerender} = renderHook(({value}) => useDebounce(value, 500), {
      initialProps: {value: 'a'},
    });

    rerender({value: 'b'});
    expect(result.current).toBe('a');

    act(() => void vi.advanceTimersByTime(499));
    expect(result.current).toBe('a');

    act(() => void vi.advanceTimersByTime(1));
    expect(result.current).toBe('b');
  });

  it('restarts the timer on every change, emitting only the final value', () => {
    const {result, rerender} = renderHook(({value}) => useDebounce(value, 500), {
      initialProps: {value: 'a'},
    });

    rerender({value: 'b'});
    act(() => void vi.advanceTimersByTime(400));
    rerender({value: 'c'});
    act(() => void vi.advanceTimersByTime(400));
    expect(result.current).toBe('a');

    act(() => void vi.advanceTimersByTime(100));
    expect(result.current).toBe('c');
  });

  it('defaults to a 500ms delay', () => {
    const {result, rerender} = renderHook(({value}) => useDebounce(value), {
      initialProps: {value: 'a'},
    });

    rerender({value: 'b'});
    act(() => void vi.advanceTimersByTime(499));
    expect(result.current).toBe('a');

    act(() => void vi.advanceTimersByTime(1));
    expect(result.current).toBe('b');
  });

  it('works with non-string values', () => {
    const {result, rerender} = renderHook(({value}) => useDebounce(value, 100), {
      initialProps: {value: 1},
    });

    rerender({value: 2});
    act(() => void vi.advanceTimersByTime(100));
    expect(result.current).toBe(2);
  });
});
