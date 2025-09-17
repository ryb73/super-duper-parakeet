// eslint-disable-next-line @typescript-eslint/no-shadow
import { describe, expect, test } from "@jest/globals";
import { isLeft } from "fp-ts/lib/Either.js";
import {
  exact,
  intersection,
  literal,
  number,
  partial,
  strict,
  string,
  union,
} from "io-ts";
import { forceDecode } from "../../src/io/forceDecode.js";
import { keyTranslator } from "../../src/io/keyTranslator.js";

const T = intersection([
  strict({ i: literal(`i`) }),
  union([strict({ a: string }), strict({ b: string })]),
  exact(partial({ n: number })),
]);

const Piped = keyTranslator({ i: `j`, b: `c` }, false).pipe(T);
const PipedStrict = keyTranslator({ i: `j`, b: `c`, a: `a`, n: `n` }).pipe(T);

test(`encode`, () => {
  const encoded = Piped.encode({ n: 8, i: `i`, b: `hoho` });
  expect(encoded).toStrictEqual({ n: 8, j: `i`, c: `hoho` });
});

describe(`decode`, () => {
  test(`translated input`, () => {
    const decoded = forceDecode(Piped, { n: 8, j: `i`, c: `hoho` });
    expect(decoded).toStrictEqual({ n: 8, i: `i`, b: `hoho` });
  });

  describe(`untranslated input`, () => {
    test(`strict`, () => {
      const decoded = PipedStrict.decode({ n: 8, i: `i`, b: `hoho` });
      expect(isLeft(decoded)).toBe(true);
    });

    test(`lax`, () => {
      const decoded = forceDecode(Piped, { n: 8, i: `i`, b: `hoho` });
      expect(decoded).toStrictEqual({ n: 8, i: `i`, b: `hoho` });
    });
  });
});
