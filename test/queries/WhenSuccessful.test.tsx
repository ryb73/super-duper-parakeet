import { render } from "@testing-library/react";
import { act, renderHook } from "@testing-library/react-hooks";
import React from "react";
import type { UseQueryOptions } from "react-query";
import { useQuery } from "react-query";
import { WhenSuccessful } from "../../src/queries/WhenSuccessful";
import { queryWrapper } from "../common/queryWrapper";

import "@testing-library/jest-dom/extend-expect";

type SampleQueryOptions = {
  error?: boolean;
  queryOptions?: UseQueryOptions;
};

function renderSampleQuery({ error, queryOptions }: SampleQueryOptions = {}) {
  return renderHook(
    () =>
      useQuery(
        `WhenSuccessful`,
        () =>
          error
            ? Promise.reject(new Error(`errr`))
            : new Promise((resolve) => {
                setTimeout(() => resolve(695), 5);
              }),
        { retry: false, ...queryOptions },
      ),
    { wrapper: queryWrapper },
  );
}

describe(`WhenSuccessful`, () => {
  test(`loading`, () => {
    const { result, waitFor } = renderSampleQuery();

    render(
      <WhenSuccessful result={result.current}>
        {({ data }) => <>Success {JSON.stringify(data)}</>}
      </WhenSuccessful>,
    ).getByText(`Loading...`);

    return waitFor(() => result.current.isSuccess);
  });

  test(`success`, async () => {
    const { result, waitFor } = renderSampleQuery();

    await waitFor(() => result.current.isSuccess);

    render(
      <WhenSuccessful result={result.current}>
        {({ data }) => <>Success {JSON.stringify(data)}</>}
      </WhenSuccessful>,
    ).getByText(`Success 695`);
  });

  test(`error`, async () => {
    jest.spyOn(console, `error`).mockImplementation();

    const { result, waitFor } = renderSampleQuery({ error: true });

    await waitFor(() => result.current.isError);

    render(
      <WhenSuccessful result={result.current}>
        {({ data }) => <>Success {JSON.stringify(data)}</>}
      </WhenSuccessful>,
    ).getByText(`Error :(`);
  });

  test(`refetching`, async () => {
    const { result, waitFor } = renderSampleQuery();

    await waitFor(() => result.current.isSuccess);
    await waitFor(() => result.current.isStale);

    act(() => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      result.current.refetch();
    });

    await waitFor(() => result.current.isFetching);

    render(
      <WhenSuccessful result={result.current}>
        {({ data, isFetching }) => (
          <>Success {JSON.stringify([data, isFetching])}</>
        )}
      </WhenSuccessful>,
    ).getByText(`Success [695,true]`);
  });

  test(`idle`, () => {
    const { result } = renderSampleQuery({ queryOptions: { enabled: false } });

    render(
      <WhenSuccessful result={result.current}>
        {({ data, isFetching }) => (
          <>Success {JSON.stringify([data, isFetching])}</>
        )}
      </WhenSuccessful>,
    ).getByText(`Loading...`);
  });

  test(`retries`, async () => {
    jest.spyOn(console, `error`).mockImplementation();

    const { result, waitFor } = renderSampleQuery({
      queryOptions: { retry: 1, retryDelay: 5 },
      error: true,
    });

    await waitFor(() => result.current.failureCount === 1);

    render(
      <WhenSuccessful result={result.current}>
        {({ data, isFetching }) => (
          <>Success {JSON.stringify([data, isFetching])}</>
        )}
      </WhenSuccessful>,
    ).getByText(`Loading... (retry 1)`);

    await waitFor(() => result.current.isError);
  });
});
