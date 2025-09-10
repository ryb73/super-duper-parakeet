import { act, renderHook } from "@testing-library/react-hooks";
import { useCallback, useRef, useState } from "react";
import { delay } from "../src/fp/delay.js";
import { useAsyncEffect } from "../src/useAsyncEffect.js";
import { wait } from "../src/wait.js";

describe(`without early cancel`, () => {
  test(`no destructor`, async () => {
    expect.assertions(1);

    const { result } = renderHook(() => {
      const [value, setValue] = useState<number>(0);
      const finalRef = useRef<number[]>([]);

      useAsyncEffect(
        useCallback(
          async (canceled) => {
            await delay(10);

            if (canceled.current) return;

            finalRef.current.push(value);
          },
          [value],
        ),
      );

      return { value, setValue, finalRef };
    });

    await act(() => wait(20));

    expect(result.current.finalRef.current).toStrictEqual([0]);
  });

  test(`destructor`, async () => {
    expect.assertions(1);

    const { result } = renderHook(() => {
      const [value, setValue] = useState<number>(0);
      const finalRef = useRef<number[]>([]);

      useAsyncEffect(
        useCallback(
          async (canceled) => {
            await delay(10);

            if (canceled.current) return undefined;

            finalRef.current.push(value);

            return () => finalRef.current.push(999);
          },
          [value],
        ),
      );

      return { value, setValue, finalRef };
    });

    await act(() => wait(20));

    expect(result.current.finalRef.current).toStrictEqual([0]);
  });
});

describe(`with early cancel`, () => {
  test(`updated value`, async () => {
    expect.assertions(2);

    const { result } = renderHook(() => {
      const [value, setValue] = useState<number>(0);
      const passedRef = useRef<number[]>([]);
      const canceledRef = useRef<number[]>([]);

      useAsyncEffect(
        useCallback(
          async (canceled) => {
            await delay(10);

            if (canceled.current) {
              canceledRef.current.push(value);
              return;
            }

            passedRef.current.push(value);
          },
          [value],
        ),
      );

      return { value, setValue, passedRef, canceledRef };
    });

    act(() => result.current.setValue(5));

    await act(() => wait(20));

    expect(result.current.passedRef.current).toStrictEqual([5]);
    expect(result.current.canceledRef.current).toStrictEqual([0]);
  });

  test(`unmounted`, async () => {
    expect.assertions(2);

    const { result, unmount } = renderHook(() => {
      const [value, setValue] = useState<number>(0);
      const passedRef = useRef<number[]>([]);
      const canceledRef = useRef<number[]>([]);

      useAsyncEffect(
        useCallback(
          async (canceled) => {
            await delay(10);

            if (canceled.current) {
              canceledRef.current.push(value);
              return;
            }

            passedRef.current.push(value);
          },
          [value],
        ),
      );

      return { value, setValue, passedRef, canceledRef };
    });

    act(() => unmount());

    await act(() => wait(20));

    expect(result.current.passedRef.current).toStrictEqual([]);
    expect(result.current.canceledRef.current).toStrictEqual([0]);
  });

  test(`destructor`, async () => {
    expect.assertions(2);

    const { result, unmount } = renderHook(() => {
      const [value, setValue] = useState<number>(0);
      const passedRef = useRef<number[]>([]);
      const canceledRef = useRef<number[]>([]);

      useAsyncEffect(
        useCallback(
          async (canceled) => {
            await delay(10);

            if (canceled.current) {
              canceledRef.current.push(value);
              return undefined;
            }

            passedRef.current.push(value);

            return () => passedRef.current.push(999);
          },
          [value],
        ),
      );

      return { value, setValue, passedRef, canceledRef };
    });

    act(() => result.current.setValue(5));

    await act(() => wait(20));

    act(() => unmount());

    expect(result.current.passedRef.current).toStrictEqual([5, 999]);
    expect(result.current.canceledRef.current).toStrictEqual([0]);
  });
});
