import { assert as a, defined, isDefined, n } from "../src/type-checks";

describe(`assert`, () => {
  test(`truthy`, () => {
    expect(a(99)).toBe(99);
  });

  describe(`falsy`, () => {
    test(`undefined`, () =>
      expect(() => a(undefined)).toThrow(`Assertion failed`));
    test(`null`, () => expect(() => a(null)).toThrow(`Assertion failed`));
    test(`empty string`, () => expect(() => a(``)).toThrow(`Assertion failed`));
  });
});

describe(`defined`, () => {
  describe(`true`, () => {
    test(`truthy`, () => {
      const value = 99 as number | undefined;
      expect<number>(defined(value)).toBe(value);
    });

    test(`falsy`, () => {
      expect(defined(``)).toBe(``);
    });
  });

  describe(`false`, () => {
    test(`undefined`, () =>
      expect(() => defined(undefined)).toThrow(`Assertion failed`));
    test(`null`, () => expect(() => defined(null)).toThrow(`Assertion failed`));
  });
});

describe(`isNull`, () => {
  /* eslint-disable jest/no-if */
  test(`null`, () => {
    const maybe = null as number | null;

    const res = n(maybe);

    // Ensure eslint error is raised here
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (res && maybe) {
      throw new Error(`n/a`);
    }

    expect(res).toBe(true);
  });
  /* eslint-enable jest/no-if */

  test(`not null`, () => {
    expect(n(0)).toBe(false);
  });
});

describe(`isDefied`, () => {
  /* eslint-disable jest/no-if */
  test(`null`, () => {
    const maybe = null as number | null | undefined;

    const res = isDefined(maybe);

    // Ensure eslint error is raised here
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!res && maybe) {
      throw new Error(`n/a`);
    }

    expect(res).toBe(false);
  });
  /* eslint-enable jest/no-if */

  test(`undefined`, () => {
    expect(isDefined(undefined)).toBe(false);
  });

  test(`defined`, () => {
    expect(isDefined(0)).toBe(true);
  });
});
