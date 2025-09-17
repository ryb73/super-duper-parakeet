// eslint-disable-next-line @typescript-eslint/no-shadow
import { expect, test } from "@jest/globals";
import { fd } from "../../src/io/forceDecode.js";
import { TrimmedString } from "../../src/io/TrimmedString.js";

test(`decode`, () => {
  expect(fd(TrimmedString, `   null `)).toBe(`null`);
});

test(`encode`, () => {
  expect(TrimmedString.encode(` null `)).toBe(`null`);
});
