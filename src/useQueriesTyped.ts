import type { UseQueryOptions, UseQueryResult } from "react-query";
import { useQueries } from "react-query";
import type { Awaited } from "./Awaited";

// https://github.com/tannerlinsley/react-query/issues/1675
export function useQueriesTyped<
  TQueries extends readonly UseQueryOptions<any>[]
>(
  queries: [...TQueries],
): {
  [ArrayElement in keyof TQueries]: UseQueryResult<
    TQueries[ArrayElement] extends { select: infer TSelect }
      ? TSelect extends (data: any) => any
        ? ReturnType<TSelect>
        : never
      : Awaited<
          ReturnType<
            NonNullable<
              Extract<TQueries[ArrayElement], UseQueryOptions>["queryFn"]
            >
          >
        >
  >;
} {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return useQueries(
    queries as UseQueryOptions<unknown, unknown, unknown>[],
  ) as any;
}
