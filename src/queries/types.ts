import type { AxiosResponse } from "axios";
import type { Either } from "fp-ts/lib/Either";
import type { UseQueryOptions, UseQueryResult } from "react-query";

export type AxiosResult<Response> = Either<AxiosResponse<unknown>, Response>;

export type AxiosUseQueryOptions<Response> = UseQueryOptions<
  AxiosResult<Response>
>;

export type AxiosUseQueryResult<Response> = UseQueryResult<
  AxiosResult<Response>
>;
