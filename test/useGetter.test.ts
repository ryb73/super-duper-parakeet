import { renderHook } from "@testing-library/react";
import { act, useState } from "react";
import { useGetter } from "../src/useGetter.js";

test(`useGetter`, () => {
  const { result } = renderHook(() => {
    const [value, setValue] = useState<`after` | `before`>(`before`);

    const getValue = useGetter(value);

    return { setValue, getValue };
  });

  // getValue should (1) remain constant between re-renders, but (2) should aways return the current value
  const { getValue } = result.current;

  expect(getValue()).toBe(`before`);

  act(() => result.current.setValue(`after`));

  // (1) remain constant between re-renders
  expect(result.current.getValue).toBe(getValue);

  // (2) should aways return the current value
  expect(getValue()).toBe(`after`);
});
