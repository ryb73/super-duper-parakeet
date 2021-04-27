import type {
  QueryObserverLoadingErrorResult,
  QueryObserverRefetchErrorResult,
  QueryObserverResult,
  QueryObserverSuccessResult,
} from "react-query";

export type ResolvedQueryResult<D = unknown, E = unknown> =
  | QueryObserverLoadingErrorResult<D, E>
  | QueryObserverRefetchErrorResult<D, E>
  | QueryObserverSuccessResult<D, E>;

export function isQueryResolved<D, E>(
  result: QueryObserverResult<D, E>,
): result is ResolvedQueryResult<D, E> {
  return !(result.isLoading || result.isIdle);
}
