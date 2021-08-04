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
    expect(forceDecode(T, s)).toBeNull();
  });

  test(`encode`, () => {
    const s = null;
    expect(T.encode(s)).toBe(s);
  });
});
