import { render } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import React from "react";
import { useQuery } from "react-query";
import { WhenSuccessful } from "../../src/queries/WhenSuccessful";
import { queryWrapper } from "../common/queryWrapper";

import "@testing-library/jest-dom/extend-expect";

describe(`WhenSuccessful`, () => {
  test(`base`, () => {
    const { result, waitFor } = renderHook(
      () => useQuery(`WhenSuccessful`, () => 695),
      { wrapper: queryWrapper },
    );

    render(
      <WhenSuccessful result={result.current as any}>
        {(data) => <>Success {JSON.stringify(data)}</>}
      </WhenSuccessful>,
    ).getByText(`Loading...`);

    return waitFor(() => result.current.isSuccess);
  });
});
