import { isLeft } from "fp-ts/lib/Either";
import prettyReporter from "io-ts-reporters";
import { assert } from "../../src/assert";
import { fd } from "../../src/io/forceDecode";
import { NullFromString } from "../../src/io/NullFromString";

describe(`decode`, () => {
  test(`null`, () => {
    expect(fd(NullFromString, `null`)).toBeNull();
  });

  describe(`not null`, () => {
    test(`string`, () => {
      const decoded = NullFromString.decode(`not null`);
      assert(isLeft(decoded));
      expect(prettyReporter.report(decoded)).toStrictEqual([
        `Expecting NullFromString but instead got: "not null"`,
      ]);
    });
    test(`not string`, () => {
      const decoded = NullFromString.decode(null);
      assert(isLeft(decoded));
      expect(prettyReporter.report(decoded)).toStrictEqual([
        `Expecting NullFromString but instead got: null`,
      ]);
    });
  });

  test(`encode`, () => {
    expect(NullFromString.encode(null)).toBe(`null`);
  });
});
