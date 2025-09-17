// eslint-disable-next-line @typescript-eslint/no-shadow
import { describe, expect, test } from "@jest/globals";
import { isLeft } from "fp-ts/lib/Either.js";
import prettyReporter from "io-ts-reporters";
import { assert } from "../../src/assert.js";
import { fd } from "../../src/io/forceDecode.js";
import { NullFromString } from "../../src/io/NullFromString.js";

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
});

test(`encode`, () => {
  expect(NullFromString.encode(null)).toBe(`null`);
});
