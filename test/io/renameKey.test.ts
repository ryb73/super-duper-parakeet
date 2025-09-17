import assert from "node:assert";
// eslint-disable-next-line @typescript-eslint/no-shadow
import { describe, expect, test } from "@jest/globals";
import type { TypeOf } from "io-ts";
import {
  boolean,
  exact,
  intersection,
  literal,
  number,
  partial,
  strict,
  string,
  type,
  union,
} from "io-ts";
import { forceDecode } from "../../src/io/forceDecode.js";
import { renameKey } from "../../src/io/renameKey.js";

describe(`renameKey`, () => {
  describe(`basic`, () => {
    describe(`single`, () => {
      const Base = type({ a: string });
      const T = renameKey(Base, `a`, `b`);

      const value = { b: `asdf` };

      test(`is`, () => {
        const actual = T.is(value);
        expect(actual).toBe(true);
      });

      test(`encode`, () => {
        const { b } = T.encode(value);
        expect(b).toStrictEqual(value.b);
      });

      test(`decode`, () => {
        const { b } = forceDecode(T, value);
        expect(b).toStrictEqual(value.b);
      });
    });

    describe(`nested`, () => {
      const XT = renameKey(type({ a: string, x: number }), `a`, `b`);
      const T = renameKey(XT, `x`, `y`);

      const value = { b: `asdf`, y: 4 };

      test(`is`, () => {
        const actual = T.is(value);
        expect(actual).toBe(true);
      });

      test(`encode`, () => {
        const { b, y } = T.encode(value);
        expect(b).toStrictEqual(value.b);
        expect(y).toStrictEqual(value.y);
      });

      test(`decode`, () => {
        const { b, y } = forceDecode(T, value);
        expect(b).toStrictEqual(value.b);
        expect(y).toStrictEqual(value.y);
      });
    });
  });

  describe(`exact`, () => {
    describe(`type`, () => {
      const T = renameKey(strict({ a: string }), `a`, `b`);

      const value = { b: `asdf` };

      test(`is`, () => {
        const actual = T.is(value);
        expect(actual).toBe(true);
      });

      test(`encode`, () => {
        const actual = T.encode(value);
        expect(actual).toStrictEqual(value);
      });

      test(`decode`, () => {
        const actual = forceDecode(T, value);
        expect(actual).toStrictEqual(value);
      });
    });

    describe(`partial`, () => {
      const T = renameKey(exact(partial({ a: string })), `a`, `b`);

      const value = { b: `asdf` };

      test(`is`, () => {
        const actual = T.is(value);
        expect(actual).toBe(true);
      });

      test(`encode`, () => {
        const actual = T.encode(value);
        expect(actual).toStrictEqual(value);
      });

      test(`decode`, () => {
        const actual = forceDecode(T, value);
        expect(actual).toStrictEqual(value);
      });
    });
  });

  describe(`partial`, () => {
    const T = renameKey(partial({ a: string }), `a`, `b`);

    describe(`with`, () => {
      const value = { b: `asdf` };

      test(`is`, () => {
        const actual = T.is(value);
        expect(actual).toBe(true);
      });

      test(`encode`, () => {
        const { b } = T.encode(value);
        expect(b).toStrictEqual(value.b);
      });

      test(`decode`, () => {
        const { b } = forceDecode(T, value);
        expect(b).toStrictEqual(value.b);
      });
    });

    describe(`without`, () => {
      const value = {};

      test(`is`, () => {
        const actual = T.is(value);
        expect(actual).toBe(true);
      });

      test(`encode`, () => {
        const actual = T.encode(value);
        expect(actual).toStrictEqual(value);
      });

      test(`decode`, () => {
        const actual = forceDecode(T, value);
        expect(actual).toStrictEqual(value);
      });
    });
  });

  describe(`union`, () => {
    describe(`two`, () => {
      const U = union([type({ a: string }), type({ x: number })]);
      const T = renameKey<"a", "b", typeof U>(U, `a`, `b`);

      describe(`left`, () => {
        const value = { b: `asdf` };

        test(`is`, () => {
          const actual = T.is(value);
          expect(actual).toBe(true);
        });

        test(`encode`, () => {
          const encoded = T.encode(value);
          expect(encoded).toStrictEqual(value);

          assert(`b` in encoded);

          const { b } = encoded;
          expect(b).toStrictEqual(value.b);
        });

        test(`decode`, () => {
          const decoded = forceDecode(T, value);
          expect(decoded).toStrictEqual(value);

          assert(`b` in decoded);

          const { b } = decoded;
          expect(b).toStrictEqual(value.b);
        });
      });

      describe(`right`, () => {
        const value = { x: 4 };

        test(`is`, () => {
          const actual = T.is(value);
          expect(actual).toBe(true);
        });

        test(`encode`, () => {
          const actual = T.encode(value);
          expect(actual).toStrictEqual(value);
        });

        test(`decode`, () => {
          const actual = forceDecode(T, value);
          expect(actual).toStrictEqual(value);
        });
      });
    });

    describe(`many`, () => {
      const U = union([
        type({ a: string }),
        partial({ x: number }),
        strict({ i: literal(`i`) }),
        exact(partial({ u: boolean })),
      ]);
      const Inner = renameKey<"a", "b", typeof U>(U, `a`, `b`);
      const T = renameKey<"u", "v", typeof Inner>(Inner, `u`, `v`);

      describe(`renamed`, () => {
        const value = { b: `asdf` };

        test(`is`, () => {
          const actual = T.is(value);
          expect(actual).toBe(true);
        });

        test(`encode`, () => {
          const encoded = T.encode(value);
          expect(encoded).toStrictEqual(value);

          assert(`b` in encoded);

          const { b } = encoded;
          expect(b).toStrictEqual(value.b);
        });

        test(`decode`, () => {
          const decoded = forceDecode(T, value);
          expect(decoded).toStrictEqual(value);

          assert(`b` in decoded);

          const { b } = decoded;
          expect(b).toStrictEqual(value.b);
        });
      });

      describe(`unrenamed`, () => {
        const value = { i: `i` as const };

        test(`is`, () => {
          const actual = T.is(value);
          expect(actual).toBe(true);
        });

        test(`encode`, () => {
          const actual = T.encode(value);
          expect(actual).toStrictEqual(value);
        });

        test(`decode`, () => {
          const actual = forceDecode(T, value);
          expect(actual).toStrictEqual(value);
        });
      });
    });
  });

  describe(`intersection`, () => {
    describe(`two`, () => {
      const U = intersection([type({ a: string }), type({ x: number })]);
      const T = renameKey<"a", "b", typeof U>(U, `a`, `b`);

      const value = { b: `asdf`, x: 823 };

      test(`is`, () => {
        const actual = T.is(value);
        expect(actual).toBe(true);
      });

      test(`encode`, () => {
        const encoded = T.encode(value);
        expect(encoded).toStrictEqual(value);

        assert(`b` in encoded);

        const { b } = encoded;
        expect(b).toStrictEqual(value.b);
      });

      test(`decode`, () => {
        const decoded = forceDecode(T, value);
        expect(decoded).toStrictEqual(value);

        assert(`b` in decoded);

        const { b } = decoded;
        expect(b).toStrictEqual(value.b);
      });
    });

    describe(`many`, () => {
      const U = intersection([
        type({ a: string }),
        partial({ x: number }),
        strict({ i: literal(`i`) }),
        exact(partial({ u: boolean })),
      ]);
      const Inner = renameKey<"a", "b", typeof U>(U, `a`, `b`);
      const T = renameKey<"u", "v", typeof Inner>(Inner, `u`, `v`);

      const value: TypeOf<typeof T> = { b: `asdf`, i: `i`, v: false };

      test(`is`, () => {
        const actual = T.is(value);
        expect(actual).toBe(true);
      });

      test(`encode`, () => {
        const encoded = T.encode(value);
        expect(encoded).toStrictEqual(value);

        assert(`b` in encoded);

        const { b } = encoded;
        expect(b).toStrictEqual(value.b);
      });

      test(`decode`, () => {
        const decoded = forceDecode(T, value);
        expect(decoded).toStrictEqual(value);

        assert(`b` in decoded);

        const { b } = decoded;
        expect(b).toStrictEqual(value.b);
      });
    });
  });
});
