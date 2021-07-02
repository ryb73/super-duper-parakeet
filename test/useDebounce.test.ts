import { act, renderHook } from "@testing-library/react-hooks";
import { useState } from "react";
import { useDebounce } from "../src/useDebounce";
import { wait } from "../src/wait";

test(`works`, async () => {
  const { result } = renderHook(() => {
    const [value, setValue] = useState(0);
    const debounced = useDebounce(value, 10);
    return { value, setValue, debounced };
  });

  act(() => result.current.setValue(2));

  expect(result.current.value).toBe(2);
  expect(result.current.debounced).toBe(0);

  await act(() => wait(20));

  expect(result.current.debounced).toBe(2);
});
