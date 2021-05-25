import { render } from "@testing-library/react";
import React from "react";
import { Loading } from "../src/Loading";

import "@testing-library/jest-dom/extend-expect";

describe(`Loading`, () => {
  test(`base`, () => {
    render(<Loading />).getByText(`Loading...`);
  });
});