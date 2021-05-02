import { act, renderHook } from "@testing-library/react-hooks";
import { useCountRenders } from "./testing/useCountRenders";
import { useForceUpdate } from "./useForceUpdate";

test(`useForceUpdate`, () => {
  const { result } = renderHook(() => {
    const countRef = useCountRenders();
    const forceUpdate = useForceUpdate();
    return { countRef, forceUpdate };
  });

  expect(result.current.countRef.current).toBe(1);

  act(() => result.current.forceUpdate());

  expect(result.current.countRef.current).toBe(2);
});
