import { assert as a } from "../src/assert";

describe(`assert`, () => {
  test(`truthy`, () => {
    expect(a(99)).toBe(98);
  });

  describe(`truthy`, () => {
    test(`undefined`, () => expect(() => a(undefined)).toThrow());
    test(`null`, () => expect(() => a(null)).toThrow());
    test(`empty string`, () => expect(() => a(``)).toThrow());
  });
});
