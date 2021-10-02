import assert from "assert";
import type { Type, TypeOf } from "io-ts";
import {
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
import { omit } from "lodash";
import { forceDecode } from "../../src/io/forceDecode";
import { makePartial } from "../../src/io/makePartial";

describe(`type`, () => {
  const T = makePartial(type({ n: number, s: string }));

  describe(`has`, () => {
    const value: TypeOf<typeof T> = { n: 4, s: `hr` };

    describe(`is`, () => {
      test(`is`, () => {
        const actual = T.is(value);
        expect(actual).toBe(true);
      });

      test(`isn't`, () => {
        const actual = T.is({ n: `no` });
        expect(actual).toBe(false);
      });
    });

    test(`encode`, () => {
      const { n, s } = T.encode(value);
      expect(n).toBe(value.n);
      expect(s).toBe(value.s);
    });

    test(`decode`, () => {
      const { n, s } = forceDecode(T, value);
      expect(n).toBe(value.n);
      expect(s).toBe(value.s);
    });
  });

  describe(`has not`, () => {
    const value: TypeOf<typeof T> = { n: 5 };

    describe(`is`, () => {
      test(`is`, () => {
        const actual = T.is(value);
        expect(actual).toBe(true);
      });

      test(`isn't`, () => {
        const actual = T.is({ n: `no` });
        expect(actual).toBe(false);
      });
    });

    test(`encode`, () => {
      const { n, s } = T.encode(value);
      expect(n).toBe(value.n);
      expect(s).toBe(value.s);
    });

    test(`decode`, () => {
      const { n, s } = forceDecode(T, value);
      expect(n).toBe(value.n);
      expect(s).toBe(value.s);
    });
  });
});

describe(`partial`, () => {
  const T = makePartial(partial({ n: number, s: string }));

  describe(`has`, () => {
    const value: TypeOf<typeof T> = { n: 4, s: `hr` };

    describe(`is`, () => {
      test(`is`, () => {
        const actual = T.is(value);
        expect(actual).toBe(true);
      });

      test(`isn't`, () => {
        const actual = T.is({ n: `no` });
        expect(actual).toBe(false);
      });
    });

    test(`encode`, () => {
      const { n, s } = T.encode(value);
      expect(n).toBe(value.n);
      expect(s).toBe(value.s);
    });

    test(`decode`, () => {
      const { n, s } = forceDecode(T, value);
      expect(n).toBe(value.n);
      expect(s).toBe(value.s);
    });
  });

  describe(`has not`, () => {
    const value: TypeOf<typeof T> = { n: 5 };

    describe(`is`, () => {
      test(`is`, () => {
        const actual = T.is(value);
        expect(actual).toBe(true);
      });

      test(`isn't`, () => {
        const actual = T.is({ n: `no` });
        expect(actual).toBe(false);
      });
    });

    test(`encode`, () => {
      const { n, s } = T.encode(value);
      expect(n).toBe(value.n);
      expect(s).toBe(value.s);
    });

    test(`decode`, () => {
      const { n, s } = forceDecode(T, value);
      expect(n).toBe(value.n);
      expect(s).toBe(value.s);
    });
  });
});

describe(`exact`, () => {
  describe(`type`, () => {
    const T = makePartial(strict({ n: number, s: string }));

    describe(`has`, () => {
      const full = { n: 4, s: `hr`, other: `noo` };
      const value: TypeOf<typeof T> = full;
      const expected = omit(full, `other`);

      describe(`is`, () => {
        test(`is`, () => {
          const actual = T.is(value);
          expect(actual).toBe(true);
        });

        test(`isn't`, () => {
          const actual = T.is({ n: `no` });
          expect(actual).toBe(false);
        });
      });

      test(`encode`, () => {
        const encoded = T.encode(value);
        expect(encoded).toStrictEqual(expected);

        const { n, s } = encoded;
        expect(n).toBe(value.n);
        expect(s).toBe(value.s);
      });

      test(`decode`, () => {
        const decoded = forceDecode(T, value);
        expect(decoded).toStrictEqual(expected);

        const { n, s } = decoded;
        expect(n).toBe(value.n);
        expect(s).toBe(value.s);
      });
    });

    describe(`has not`, () => {
      const full = { n: 5, other: `noo` };
      const value: TypeOf<typeof T> = { n: 5 };
      const expected = omit(full, `other`);

      describe(`is`, () => {
        test(`is`, () => {
          const actual = T.is(value);
          expect(actual).toBe(true);
        });

        test(`isn't`, () => {
          const actual = T.is({ n: `no` });
          expect(actual).toBe(false);
        });
      });

      test(`encode`, () => {
        const encoded = T.encode(value);
        expect(encoded).toStrictEqual(expected);

        const { n, s } = encoded;
        expect(n).toBe(value.n);
        expect(s).toBe(value.s);
      });

      test(`decode`, () => {
        const decoded = forceDecode(T, value);
        expect(decoded).toStrictEqual(expected);

        const { n, s } = decoded;
        expect(n).toBe(value.n);
        expect(s).toBe(value.s);
      });
    });
  });

  describe(`partial`, () => {
    const OrigT = exact(partial({ n: number, s: string }));
    const T = makePartial<typeof OrigT>(OrigT);

    describe(`has`, () => {
      const full = { n: 4, s: `hr`, other: `noo` };
      const value: TypeOf<typeof T> = full;
      const expected = omit(full, `other`);

      describe(`is`, () => {
        test(`is`, () => {
          const actual = T.is(value);
          expect(actual).toBe(true);
        });

        test(`isn't`, () => {
          const actual = T.is({ n: `no` });
          expect(actual).toBe(false);
        });
      });

      test(`encode`, () => {
        const encoded = T.encode(value);
        expect(encoded).toStrictEqual(expected);

        const { n, s } = encoded;
        expect(n).toBe(value.n);
        expect(s).toBe(value.s);
      });

      test(`decode`, () => {
        const decoded = forceDecode(T, value);
        expect(decoded).toStrictEqual(expected);

        const { n, s } = decoded;
        expect(n).toBe(value.n);
        expect(s).toBe(value.s);
      });
    });

    describe(`has not`, () => {
      const full = { n: 5, other: `noo` };
      const value: TypeOf<typeof T> = { n: 5 };
      const expected = omit(full, `other`);

      describe(`is`, () => {
        test(`is`, () => {
          const actual = T.is(value);
          expect(actual).toBe(true);
        });

        test(`isn't`, () => {
          const actual = T.is({ n: `no` });
          expect(actual).toBe(false);
        });
      });

      test(`encode`, () => {
        const encoded = T.encode(value);
        expect(encoded).toStrictEqual(expected);

        const { n, s } = encoded;
        expect(n).toBe(value.n);
        expect(s).toBe(value.s);
      });

      test(`decode`, () => {
        const decoded = forceDecode(T, value);
        expect(decoded).toStrictEqual(expected);

        const { n, s } = decoded;
        expect(n).toBe(value.n);
        expect(s).toBe(value.s);
      });
    });
  });
});

function unionTestT<P extends Record<string, unknown>>(
  T: Type<P & { t?: string }, P & { t?: string }>,
) {
  describe(`t`, () => {
    describe(`has`, () => {
      const value = { t: `tee` } as P & { t?: string };

      describe(`is`, () => {
        test(`is`, () => {
          const actual = T.is(value);
          expect(actual).toBe(true);
        });

        test(`isn't`, () => {
          const actual = T.is(`no`);
          expect(actual).toBe(false);
        });
      });

      test(`encode`, () => {
        const encoded = T.encode(value);
        expect(encoded).toBe(value);

        assert(`t` in encoded);

        const { t } = encoded;
        expect(t).toBe(value.t);
      });

      test(`decode`, () => {
        const decoded = forceDecode(T, value);
        expect(decoded).toBe(value);

        assert(`t` in decoded);

        const { t } = decoded;
        expect(t).toBe(value.t);
      });
    });

    describe(`has not`, () => {
      const value = {} as P & { t?: string };

      describe(`is`, () => {
        test(`is`, () => {
          const actual = T.is(value);
          expect(actual).toBe(true);
        });

        test(`isn't`, () => {
          const actual = T.is(`no`);
          expect(actual).toBe(false);
        });
      });

      test(`encode`, () => {
        const encoded = T.encode(value);
        expect(encoded).toBe(value);
      });

      test(`decode`, () => {
        const decoded = forceDecode(T, value);
        expect(decoded).toBe(value);
      });
    });
  });
}

function unionTestP<P extends Record<string, unknown>>(
  T: Type<P & { p?: string }, P & { p?: string }>,
) {
  describe(`p`, () => {
    describe(`has`, () => {
      const value: TypeOf<typeof T> = { p: `pea` } as P & { p?: string };

      describe(`is`, () => {
        test(`is`, () => {
          const actual = T.is(value);
          expect(actual).toBe(true);
        });

        test(`isn't`, () => {
          const actual = T.is(`no`);
          expect(actual).toBe(false);
        });
      });

      test(`encode`, () => {
        const encoded = T.encode(value);
        expect(encoded).toBe(value);

        assert(`p` in encoded);

        const { p } = encoded;
        expect(p).toBe(value.p);
      });

      test(`decode`, () => {
        const decoded = forceDecode(T, value);
        expect(decoded).toBe(value);

        assert(`p` in decoded);

        const { p } = decoded;
        expect(p).toBe(value.p);
      });
    });

    describe(`has not`, () => {
      const value: TypeOf<typeof T> = {} as P & { p?: string };

      describe(`is`, () => {
        test(`is`, () => {
          const actual = T.is(value);
          expect(actual).toBe(true);
        });

        test(`isn't`, () => {
          const actual = T.is(`no`);
          expect(actual).toBe(false);
        });
      });

      test(`encode`, () => {
        const encoded = T.encode(value);
        expect(encoded).toBe(value);
      });

      test(`decode`, () => {
        const decoded = forceDecode(T, value);
        expect(decoded).toBe(value);
      });
    });
  });
}

describe(`union`, () => {
  describe(`2`, () => {
    const OrigT = union([type({ t: string }), partial({ p: string })]);
    const T = makePartial<typeof OrigT>(OrigT);

    unionTestT(T);
    unionTestP(T);
  });

  describe(`>= 2`, () => {
    const OrigT = union([
      type({ t: string }),
      partial({ p: string }),
      strict({ str: literal(`ict`) }),
    ]);
    const T = makePartial<typeof OrigT>(OrigT);

    unionTestT(T);
    unionTestP(T);

    describe(`str`, () => {
      describe(`has`, () => {
        const value: TypeOf<typeof T> = { str: `ict` };

        describe(`is`, () => {
          test(`is`, () => {
            const actual = T.is(value);
            expect(actual).toBe(true);
          });

          test(`isn't`, () => {
            const actual = T.is(`no`);
            expect(actual).toBe(false);
          });
        });

        test(`encode`, () => {
          const encoded = T.encode(value);
          expect(encoded).toBe(value);

          if (!(`str` in encoded)) throw new Error(`expected str`);

          const { str } = encoded;
          expect(str).toBe(value.str);
        });

        test(`decode`, () => {
          const decoded = forceDecode(T, value);
          expect(decoded).toBe(value);

          if (!(`str` in decoded)) throw new Error(`expected str`);

          const { str } = decoded;
          expect(str).toBe(value.str);
        });
      });

      describe(`has not`, () => {
        const value: TypeOf<typeof T> = {};

        describe(`is`, () => {
          test(`is`, () => {
            const actual = T.is(value);
            expect(actual).toBe(true);
          });

          test(`isn't`, () => {
            const actual = T.is(`no`);
            expect(actual).toBe(false);
          });
        });

        test(`encode`, () => {
          const encoded = T.encode(value);
          expect(encoded).toBe(value);
        });

        test(`decode`, () => {
          const decoded = forceDecode(T, value);
          expect(decoded).toBe(value);
        });
      });
    });
  });
});

describe(`intersection`, () => {
  describe(`2`, () => {
    const OrigT = intersection([type({ t: string }), partial({ p: string })]);
    const T = makePartial<typeof OrigT>(OrigT);

    describe(`has`, () => {
      const value: TypeOf<typeof T> = { t: `sfd`, p: `fda` };

      describe(`is`, () => {
        test(`is`, () => {
          const actual = T.is(value);
          expect(actual).toBe(true);
        });

        test(`isn't`, () => {
          const actual = T.is({ p: 99 });
          expect(actual).toBe(false);
        });
      });

      test(`encode`, () => {
        const { t, p } = T.encode(value);
        expect(t).toBe(value.t);
        expect(p).toBe(value.p);
      });

      test(`decode`, () => {
        const { t, p } = forceDecode(T, value);
        expect(t).toBe(value.t);
        expect(p).toBe(value.p);
      });
    });

    describe(`has not`, () => {
      const value: TypeOf<typeof T> = { p: `5` };

      describe(`is`, () => {
        test(`is`, () => {
          const actual = T.is(value);
          expect(actual).toBe(true);
        });

        test(`isn't`, () => {
          const actual = T.is({ p: 99 });
          expect(actual).toBe(false);
        });
      });

      test(`encode`, () => {
        const { t, p } = T.encode(value);
        expect(t).toBe(value.t);
        expect(p).toBe(value.p);
      });

      test(`decode`, () => {
        const { t, p } = forceDecode(T, value);
        expect(t).toBe(value.t);
        expect(p).toBe(value.p);
      });
    });
  });

  describe(`3`, () => {
    const OrigT = intersection([
      type({ t: string }),
      partial({ p: string }),
      union([type({ x: number }), type({ y: number })]),
    ]);
    const T = makePartial<typeof OrigT>(OrigT);

    describe(`has`, () => {
      const value: TypeOf<typeof T> = { t: `sfd`, p: `fda`, x: 909 };

      describe(`is`, () => {
        test(`is`, () => {
          const actual = T.is(value);
          expect(actual).toBe(true);
        });

        test(`isn't`, () => {
          const actual = T.is({ p: 99 });
          expect(actual).toBe(false);
        });
      });

      test(`encode`, () => {
        const encoded = T.encode(value);
        expect(encoded).toBe(value);

        assert(`x` in encoded);

        const { t, p, x } = encoded;
        expect(t).toBe(value.t);
        expect(p).toBe(value.p);
        expect(x).toBe(value.x);
      });

      test(`decode`, () => {
        const decoded = forceDecode(T, value);
        expect(decoded).toBe(value);

        assert(`x` in decoded);

        const { t, p, x } = decoded;
        expect(t).toBe(value.t);
        expect(p).toBe(value.p);
        expect(x).toBe(value.x);
      });
    });

    describe(`has not`, () => {
      const value: TypeOf<typeof T> = { p: `5` };

      describe(`is`, () => {
        test(`is`, () => {
          const actual = T.is(value);
          expect(actual).toBe(true);
        });

        test(`isn't`, () => {
          const actual = T.is({ p: 99 });
          expect(actual).toBe(false);
        });
      });

      test(`encode`, () => {
        const { t, p } = T.encode(value);
        expect(t).toBe(value.t);
        expect(p).toBe(value.p);
      });

      test(`decode`, () => {
        const { t, p } = forceDecode(T, value);
        expect(t).toBe(value.t);
        expect(p).toBe(value.p);
      });
    });
  });
});
