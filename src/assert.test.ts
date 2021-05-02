import { assert as a } from "./assert";

describe(`assert`, () => {
  test(`truthy`, () => {
    expect(a(99)).toBe(99);
  });

  describe(`truthy`, () => {
    test(`undefined`, () => expect(() => a(undefined)).toThrow());
    test(`null`, () => expect(() => a(null)).toThrow());
    test(`empty string`, () => expect(() => a(``)).toThrow());
  });
});
