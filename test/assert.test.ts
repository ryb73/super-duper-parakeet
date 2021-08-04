import { assert as a } from "../src/assert";

describe(`assert`, () => {
  test(`truthy`, () => {
    expect(a(99)).toBe(99);
  });

  describe(`truthy`, () => {
    test(`undefined`, () =>
      expect(() => a(undefined)).toThrow(`Assertion failed`));
    test(`null`, () => expect(() => a(null)).toThrow(`Assertion failed`));
    test(`empty string`, () => expect(() => a(``)).toThrow(`Assertion failed`));
  });
});
