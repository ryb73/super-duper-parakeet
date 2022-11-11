import { string } from "io-ts";
import { DecodeError, forceDecode } from "../../src/io/forceDecode";

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
        /Decode failed:\s+9\s+\["Expecting string but instead got: 9"\]/u;
      expect(() => forceDecode(T, notS)).toThrow(message);
    });

    test(`custom message`, () => {
      const notS = 9;
      expect(() => forceDecode(T, notS, `Ooops`)).toThrow(`Ooops`);
    });

    test(`DecodeError`, () => {
      const notS = 9;
      expect(() => forceDecode(T, notS)).toThrow(DecodeError);
    });
  });
});

test(`no promises`, () => {
  const T = string;
  const s = `hello`;

  function decode() {
    // @ts-expect-error - This is the real test. decoded should be type `invalid`, causing a TS error
    const decoded: string = forceDecode(T, Promise.resolve(s));
    return decoded;
  }
  expect(decode).toThrow(``);
});
