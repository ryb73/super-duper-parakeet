import type { ReactNode } from "react";
import type {
  QueryObserverResult,
  QueryObserverSuccessResult,
} from "react-query";
import { isQueryResolved } from "./isQueryResolved";
import { Loading } from "./Loading";

type SingularProps<Data> = {
  result: QueryObserverResult<Data>;
  children: (result: QueryObserverSuccessResult<Data>) => ReactNode;
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

  if (relevantResult?.isLoading) return <Loading result={relevantResult} />;
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
}: SingularProps<Data>) {
  if (result.isLoading) return <Loading result={result} />;
  if (result.isIdle) return <Loading />;
  if (result.isError) return <div>Error :(</div>;

  return <>{children(result)}</>;
}
