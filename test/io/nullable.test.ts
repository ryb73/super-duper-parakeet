import { string } from "io-ts";
import { forceDecode } from "../../src/io/forceDecode";
import { nullable } from "../../src/io/nullable";

const T = nullable(string);

describe(`non-null`, () => {
  test(`decode`, () => {
    const s = `hello`;
    expect(forceDecode(T, s)).toBe(s);
  });

  test(`encode`, () => {
    const s = `hello`;
    expect(T.encode(s)).toBe(s);
  });
});

describe(`null`, () => {
  test(`decode`, () => {
    const s = null;
    expect(forceDecode(T, s)).toBe(undefined);
  });
});

describe(`undefined`, () => {
  test(`decode`, () => {
    const s = undefined;
    expect(forceDecode(T, s)).toBe(undefined);
  });

  test(`encode`, () => {
    const s = undefined;
    expect(T.encode(s)).toBe(undefined);
  });
});
