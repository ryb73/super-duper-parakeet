import { assert as a } from "../src/assert.js";

describe(`assert`, () => {
  test(`true`, () => {
    expect(() => a(true)).not.toThrow(`Assertion failed`);
  });

  describe(`false`, () => {
    test(`basic`, () => {
      expect(() => a(false)).toThrow(`Assertion failed`);
    });

    test(`message`, () => {
      expect(() => a(false, `msg`)).toThrow(`Assertion failed: msg`);
    });
  });
});
