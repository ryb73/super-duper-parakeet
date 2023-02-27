import { fd } from "../../src/io/forceDecode";
import { TrimmedString } from "../../src/io/TrimmedString";

test(`decode`, () => {
  expect(fd(TrimmedString, `   null `)).toBe(`null`);
});

test(`encode`, () => {
  expect(TrimmedString.encode(` null `)).toBe(`null`);
});
