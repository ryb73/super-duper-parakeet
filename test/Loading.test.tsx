import { render } from "@testing-library/react";
import React from "react";
import { Loading } from "../src/Loading";

import "@testing-library/jest-dom/extend-expect";

describe(`Loading`, () => {
  test(`base`, () => {
    expect.assertions(1);

    expect(() => render(<Loading />).getByText(`Loading...`)).not.toThrow();
  });

  describe(`retryCount`, () => {
    test(`base`, () => {
      expect.assertions(1);

      expect(() =>
        render(<Loading retryCount={2} />).getByText(`Loading... (retry 2)`),
      ).not.toThrow();
    });

    test(`=== 0`, () => {
      expect.assertions(1);

      expect(() =>
        render(<Loading retryCount={0} />).getByText(`Loading...`),
      ).not.toThrow();
    });
  });
});
