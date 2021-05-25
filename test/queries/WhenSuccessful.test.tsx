import type { PropsOf } from "@emotion/react";
import { render } from "@testing-library/react";
import { act, renderHook } from "@testing-library/react-hooks";
import React from "react";
import type { QueryObserverSuccessResult, UseQueryOptions } from "react-query";
import { useQuery } from "react-query";
import type { Options as LoadingOptions } from "../../src/Loading";
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

type OptionalProps = Omit<
  PropsOf<typeof WhenSuccessful>,
  "children" | "result"
>;

type TestOptions = {
  props?: OptionalProps;
  text?: string;
};

function renderSuccess({ data, isFetching }: QueryObserverSuccessResult) {
  return <>Success {JSON.stringify([data, isFetching])}</>;
}

function testRetries({
  props,
  text = `Loading... (retry 1)`,
}: TestOptions = {}) {
  test(`retries`, async () => {
    jest.spyOn(console, `error`).mockImplementation();

    const { result, waitFor } = renderSampleQuery({
      queryOptions: { retry: 1, retryDelay: 5 },
      error: true,
    });

    await waitFor(() => result.current.failureCount === 1);

    render(
      <WhenSuccessful {...props} result={result.current}>
        {renderSuccess}
      </WhenSuccessful>,
    ).getByText(text);

    await waitFor(() => result.current.isError);
  });
}

function testIdle({ props, text = `Loading...` }: TestOptions = {}) {
  test(`idle`, () => {
    const { result } = renderSampleQuery({
      queryOptions: { enabled: false },
    });

    render(
      <WhenSuccessful {...props} result={result.current}>
        {renderSuccess}
      </WhenSuccessful>,
    ).getByText(text);
  });
}

function testLoading({ props, text = `Loading...` }: TestOptions = {}) {
  test(`loading`, () => {
    const { result, waitFor } = renderSampleQuery();

    render(
      <WhenSuccessful {...props} result={result.current}>
        {renderSuccess}
      </WhenSuccessful>,
    ).getByText(text);

    return waitFor(() => result.current.isSuccess);
  });
}

describe(`WhenSuccessful`, () => {
  testLoading();
  testIdle();
  testRetries();

  test(`success`, async () => {
    const { result, waitFor } = renderSampleQuery();

    await waitFor(() => result.current.isSuccess);

    render(
      <WhenSuccessful result={result.current}>{renderSuccess}</WhenSuccessful>,
    ).getByText(`Success [695,false]`);
  });

  test(`error`, async () => {
    jest.spyOn(console, `error`).mockImplementation();

    const { result, waitFor } = renderSampleQuery({ error: true });

    await waitFor(() => result.current.isError);

    render(
      <WhenSuccessful result={result.current}>{renderSuccess}</WhenSuccessful>,
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
      <WhenSuccessful result={result.current}>{renderSuccess}</WhenSuccessful>,
    ).getByText(`Success [695,true]`);
  });

  describe(`LoadingIndicator`, () => {
    function LoadingIndicator({ retryCount = 0 }: LoadingOptions = {}) {
      return <span>{`da da da `.repeat(retryCount + 1)}</span>;
    }

    testLoading({ props: { LoadingIndicator }, text: `da da da` });
    testIdle({ props: { LoadingIndicator }, text: `da da da` });
    testRetries({ props: { LoadingIndicator }, text: `da da da da da da` });
  });
});
