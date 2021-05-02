import { isDefined } from "./isDefined";

describe(`isDefined`, () => {
  test(`undefined`, () => {
    expect(isDefined(undefined)).toBe(false);
  });

  describe(`defined`, () => {
    test(`5`, () => expect(isDefined(5)).toBe(true));
    test(`0`, () => expect(isDefined(0)).toBe(true));
    test(`null`, () => expect(isDefined(null)).toBe(true));
  });
});
