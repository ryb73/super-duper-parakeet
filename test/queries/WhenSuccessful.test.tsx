import type { PropsOf } from "@emotion/react";
import { render, screen } from "@testing-library/react";
import { act, renderHook } from "@testing-library/react-hooks";
import React from "react";
import type { QueryObserverSuccessResult, UseQueryOptions } from "react-query";
import { useQuery } from "react-query";
import type { Options as LoadingOptions } from "../../src/Loading.js";
import { WhenSuccessful } from "../../src/queries/WhenSuccessful.js";
import { queryWrapper } from "../common/queryWrapper.js";

import "@testing-library/jest-dom/extend-expect";

type SampleQueryOptions = {
  error?: boolean;
  queryOptions?: UseQueryOptions<unknown, unknown, unknown, `WhenSuccessful`>;
};

function renderSampleQuery({
  error = false,
  queryOptions,
}: SampleQueryOptions = {}) {
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
    expect.hasAssertions();

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
    );
    expect(screen.getByText(text)).toBeInTheDocument();

    await waitFor(() => expect(result.current.isError).toBe(true));
  });
}

function testIdle({ props, text = `Loading...` }: TestOptions = {}) {
  test(`idle`, () => {
    expect.hasAssertions();

    const { result } = renderSampleQuery({
      queryOptions: { enabled: false },
    });

    render(
      <WhenSuccessful {...props} result={result.current}>
        {renderSuccess}
      </WhenSuccessful>,
    );
    expect(() => screen.getByText(text)).not.toThrow();
  });
}

function testLoading({ props, text = `Loading...` }: TestOptions = {}) {
  test(`loading`, async () => {
    expect.hasAssertions();

    const { result, waitFor } = renderSampleQuery();

    render(
      <WhenSuccessful {...props} result={result.current}>
        {renderSuccess}
      </WhenSuccessful>,
    );
    expect(screen.getByText(text)).toBeInTheDocument();

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
  });
}

describe(`WhenSuccessful`, () => {
  testLoading();
  testIdle();
  testRetries();

  test(`success`, async () => {
    expect.hasAssertions();

    const { result, waitFor } = renderSampleQuery();

    await waitFor(() => result.current.isSuccess);

    render(
      <WhenSuccessful result={result.current}>{renderSuccess}</WhenSuccessful>,
    );

    expect(() => screen.getByText(`Success [695,false]`)).not.toThrow();
  });

  test(`error`, async () => {
    expect.hasAssertions();

    jest.spyOn(console, `error`).mockImplementation();

    const { result, waitFor } = renderSampleQuery({ error: true });

    await waitFor(() => result.current.isError);

    render(
      <WhenSuccessful result={result.current}>{renderSuccess}</WhenSuccessful>,
    );

    expect(() => screen.getByText(`Error :(`)).not.toThrow();
  });

  test(`refetching`, async () => {
    expect.hasAssertions();

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
    );

    expect(() => screen.getByText(`Success [695,true]`)).not.toThrow();
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
