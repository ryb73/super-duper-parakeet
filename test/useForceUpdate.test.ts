import { act, renderHook } from "@testing-library/react-hooks";
import { useCountRenders } from "../src/testing/useCountRenders";
import { useForceUpdate } from "../src/useForceUpdate";

function hookFn() {
  return () => {
    const countRef = useCountRenders();
    const forceUpdate = useForceUpdate();
    return { countRef, forceUpdate };
  };
}

test(`works`, () => {
  const { result } = renderHook(hookFn());

  expect(result.current.countRef.current).toBe(1);

  act(() => result.current.forceUpdate());

  expect(result.current.countRef.current).toBe(2);
});

test(`doesn't create new function on every invocation`, () => {
  const { result } = renderHook(hookFn());

  const { forceUpdate } = result.current;

  act(() => result.current.forceUpdate());

  // eslint-disable-next-line unicorn/consistent-destructuring
  expect(result.current.forceUpdate).toBe(forceUpdate);
});

test(`doesn't update if unmounted`, () => {
  const spy = jest.spyOn(console, `error`);

  const {
    result: {
      current: { forceUpdate },
    },
    unmount,
  } = renderHook(hookFn());

  unmount();

  act(() => forceUpdate());

  expect(spy.mock.calls.length).toBe(0);
});
