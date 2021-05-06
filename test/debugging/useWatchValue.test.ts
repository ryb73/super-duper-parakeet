import { renderHook } from "@testing-library/react-hooks";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  useWatchValue,
  useWatchValues,
} from "../../src/debugging/useWatchValue";

function useArrayLogger() {
  const ref = useRef<[string, Record<string, unknown>][]>([]);

  const log = useCallback(
    (message: string, data: Record<string, unknown>): number =>
      ref.current.push([message, data]),
    [],
  );

  return useMemo(() => ({ log, ref }), [log]);
}

test(`useWatchValue`, () => {
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

test(`useWatchValues`, () => {
  const { result } = renderHook(() => {
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

    useWatchValues(`watch`, { a, b, c }, { log });

    return ref;
  });

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
