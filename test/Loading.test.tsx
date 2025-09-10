import { render, screen } from "@testing-library/react";
import React from "react";
import { Loading } from "../src/Loading.js";

import "@testing-library/jest-dom/extend-expect";

describe(`Loading`, () => {
  test(`base`, () => {
    expect.assertions(1);

    render(<Loading />);

    expect(() => screen.getByText(`Loading...`)).not.toThrow();
  });

  describe(`retryCount`, () => {
    test(`base`, () => {
      expect.assertions(1);

      render(<Loading retryCount={2} />);
      expect(() => screen.getByText(`Loading... (retry 2)`)).not.toThrow();
    });

    test(`=== 0`, () => {
      expect.assertions(1);

      render(<Loading retryCount={0} />);
      expect(() => screen.getByText(`Loading...`)).not.toThrow();
    });
  });
});
