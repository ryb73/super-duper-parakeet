// eslint-disable-next-line @typescript-eslint/no-shadow
import { describe, expect, test } from "@jest/globals";
import { renderHook } from "@testing-library/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Options } from "../../src/debugging/useWatchValue.js";
import {
  useWatchValue,
  useWatchValues,
} from "../../src/debugging/useWatchValue.js";

function useArrayLogger() {
  const ref = useRef<[string, Record<string, unknown>][]>([]);

  const log = useCallback(
    (message: string, data: Record<string, unknown>): number =>
      ref.current.push([message, data]),
    [],
  );

  return useMemo(() => ({ log, ref }), [log]);
}

describe(`useWatchValue`, () => {
  test(`works`, () => {
    const { result } = renderHook(() => {
      // Update two different states in parallel. Expect logs for only changes to the watched state.
      const [watched, setWatched] = useState(0);
      const [unwatched, setUnwatched] = useState(0);

      const { log, ref } = useArrayLogger();

      useEffect(() => {
        if (watched < 3) setWatched((v) => v + 1);
      }, [watched]);

      useEffect(() => {
        if (unwatched < 10) setUnwatched((v) => v + 1);
      }, [unwatched]);

      useWatchValue(`watch`, watched, { log });

      return ref;
    });

    // Should result in 4 logs (0, 1, 2, 3)
    expect(result.current.current).toEqual([
      [`updated watch:`, 0],
      [`updated watch:`, 1],
      [`updated watch:`, 2],
      [`updated watch:`, 3],
    ]);
  });

  test(`throttle`, () => {
    const { result } = renderHook(() => {
      // Do a bunch of updates at once, make sure they don't all go through
      const [watched, setWatched] = useState(0);

      const { log, ref } = useArrayLogger();

      useEffect(() => {
        if (watched < 10) setWatched((v) => v + 1);
      }, [watched]);

      useWatchValue(`watch`, watched, { log, throttle: true });

      return ref;
    });

    // Should result in 4 logs (0, 1, 2, 3)
    expect(result.current.current).not.toEqual([
      [`updated watch:`, 0],
      [`updated watch:`, 1],
      [`updated watch:`, 2],
      [`updated watch:`, 3],
      [`updated watch:`, 4],
      [`updated watch:`, 5],
      [`updated watch:`, 6],
      [`updated watch:`, 7],
      [`updated watch:`, 8],
      [`updated watch:`, 9],
      [`updated watch:`, 10],
    ]);
  });
});

function hookFn(options: Omit<Options, "log"> = {}) {
  return () => {
    // Update states sporadically. Start by incrementing A, then B and C, and so on.
    const [a, setA] = useState(0);
    const [b, setB] = useState(0);
    const [c, setC] = useState(0);

    const { log, ref } = useArrayLogger();

    useEffect(() => {
      if (a === b && a < 3) setA((v) => v + 1);
    }, [a, b]);

    useEffect(() => {
      if (a > b && b < 3) {
        setB((v) => v + 1);
        setC((v) => v + 1);
      }
    }, [a, b]);

    useWatchValues(`watch`, { a, b, c }, { ...options, log });

    return ref;
  };
}

describe(`useWatchValues`, () => {
  test(`works`, () => {
    const { result } = renderHook(hookFn());

    // Should result in 4 logs (0, 1, 2, 3)
    expect(result.current.current).toEqual([
      [`initial watch watch:`, { a: 0, b: 0, c: 0 }],
      [`updated watch:`, { a: 1 }],
      [`updated watch:`, { b: 1, c: 1 }],
      [`updated watch:`, { a: 2 }],
      [`updated watch:`, { b: 2, c: 2 }],
      [`updated watch:`, { a: 3 }],
      [`updated watch:`, { b: 3, c: 3 }],
    ]);
  });

  test(`thottle`, () => {
    const { result } = renderHook(hookFn({ throttle: true }));

    // Should result in 4 logs (0, 1, 2, 3)
    expect(result.current.current).not.toEqual([
      [`initial watch watch:`, { a: 0, b: 0, c: 0 }],
      [`updated watch:`, { a: 1 }],
      [`updated watch:`, { b: 1, c: 1 }],
      [`updated watch:`, { a: 2 }],
      [`updated watch:`, { b: 2, c: 2 }],
      [`updated watch:`, { a: 3 }],
      [`updated watch:`, { b: 3, c: 3 }],
    ]);
  });
});
