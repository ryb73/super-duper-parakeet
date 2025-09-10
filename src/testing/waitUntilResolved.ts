import type { WaitFor, WaitOptions } from "@testing-library/react-hooks";
import type { UseQueryResult } from "react-query";
import { isQueryResolved } from "../queries/isQueryResolved.js";

export async function waitUntilResolved<T>(
  waitFor: WaitFor,
  result: () => UseQueryResult<T>,
  options?: WaitOptions,
) {
  await waitFor(() => isQueryResolved(result()), options);
}
