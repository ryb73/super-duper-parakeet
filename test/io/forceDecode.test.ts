import { string } from "io-ts";
import { forceDecode } from "../../src/io/forceDecode";

describe(`basic`, () => {
  const T = string;

  test(`good`, () => {
    const s = `hello`;
    expect(forceDecode(T, s)).toBe(s);
  });

  describe(`bad`, () => {
    test(`basic`, () => {
      const notS = 9;
      const message =
        // TODO: lint is failing on the escaped \]. submit issue to the repo for this rule?
        // eslint-disable-next-line optimize-regex/optimize-regex
        /Decode failed:\s+9\s+\["Expecting string but instead got: 9"\]/u;
      expect(() => forceDecode(T, notS)).toThrow(message);
    });

    test(`custom message`, () => {
      const notS = 9;
      expect(() => forceDecode(T, notS, `Ooops`)).toThrow(`Ooops`);
    });
  });
});

test(`no promises`, () => {
  const T = string;
  const s = `hello`;

  function decode() {
    const decoded = forceDecode(T, Promise.resolve(s));
    /* eslint-disable @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call */
    // @ts-expect-error - This is the real test. decoded should be type `never`, causing a TS error
    return decoded.toLocaleUpperCase();
    /* eslint-enable @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call */
  }
  expect(decode).toThrow(``);
});
