import type { ReactNode } from "react";
import React from "react";
import type {
  QueryObserverResult,
  QueryObserverSuccessResult,
} from "react-query";
import { Loading } from "../Loading.js";
import { isQueryResolved } from "./isQueryResolved.js";

type SingularProps<Data> = {
  readonly children: (result: QueryObserverSuccessResult<Data>) => ReactNode;
  readonly LoadingIndicator?: Loading;
  readonly result: QueryObserverResult<Data>;
};

type PairProps<D1, D2> = {
  readonly result: [QueryObserverResult<D1>, QueryObserverResult<D2>];
  readonly children: (
    result: [QueryObserverSuccessResult<D1>, QueryObserverSuccessResult<D2>],
  ) => ReactNode;
};

export function WhenSuccessfulMultiple<D1, D2>({
  result,
  children,
}: PairProps<D1, D2>) {
  const relevantResult = result.reduce(
    (acc: QueryObserverResult | undefined, r: QueryObserverResult) => {
      if (acc?.isError ?? false) return acc;
      if (r.isError || !isQueryResolved(r)) return r;
      return undefined;
    },
    undefined,
  );

  if (relevantResult != null && relevantResult.isLoading)
    return <Loading retryCount={relevantResult.failureCount} />;
  if (relevantResult != null && relevantResult.isError)
    return <div>Error :(</div>;
  if (relevantResult != null && relevantResult.isIdle) return <Loading />;

  return (
    <>
      {children(
        result as [
          QueryObserverSuccessResult<D1>,
          QueryObserverSuccessResult<D2>,
        ],
      )}
    </>
  );
}

export function WhenSuccessful<Data>({
  result,
  children,
  LoadingIndicator = Loading,
}: SingularProps<Data>) {
  if (result.isLoading)
    return <LoadingIndicator retryCount={result.failureCount} />;
  if (result.isIdle) return <LoadingIndicator />;
  if (result.isError) return <div>Error :(</div>;

  return <>{children(result)}</>;
}
