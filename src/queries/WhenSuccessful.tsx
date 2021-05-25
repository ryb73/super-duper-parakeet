import type { ReactNode } from "react";
import React from "react";
import type {
  QueryObserverResult,
  QueryObserverSuccessResult,
} from "react-query";
import { Loading } from "../Loading";
import { isQueryResolved } from "./isQueryResolved";

type SingularProps<Data> = {
  children: (result: QueryObserverSuccessResult<Data>) => ReactNode;
  LoadingIndicator?: Loading;
  result: QueryObserverResult<Data>;
};

type PairProps<D1, D2> = {
  result: [QueryObserverResult<D1>, QueryObserverResult<D2>];
  children: (
    result: [QueryObserverSuccessResult<D1>, QueryObserverSuccessResult<D2>],
  ) => ReactNode;
};

export function WhenSuccessfulMultiple<D1, D2>({
  result,
  children,
}: PairProps<D1, D2>) {
  const relevantResult = result.reduce(
    (acc: QueryObserverResult | undefined, r: QueryObserverResult) => {
      if (acc?.isError) return acc;
      if (r.isError || !isQueryResolved(r)) return r;
      return undefined;
    },
    undefined,
  );

  if (relevantResult?.isLoading)
    return <Loading retryCount={relevantResult.failureCount} />;
  if (relevantResult?.isError) return <div>Error :(</div>;
  if (relevantResult?.isIdle) return <Loading />;

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
