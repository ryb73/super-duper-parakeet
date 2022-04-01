/* eslint-disable import/no-deprecated */
import { assert } from "../type-checks";

type ValueFn<T> = () => PromiseLike<T> | T;

type Params<AllValue, EachValue> = {
  beforeAll?: ValueFn<AllValue>;
  // The afters accept both PromiseLike and void. There's risk that a poorly-formed PromiseLike object is
  // accepted as void type by Typescript, but I'm leaving as is because switching void to undefined would
  // make using afterAll annoying, and since this is a testing utility, errors are likely to be caught anyway.
  afterAll?: (value: AllValue) => PromiseLike<void> | void;
  beforeEach?: ValueFn<EachValue>;
  afterEach?: (value: EachValue) => PromiseLike<void> | void;
  tests: (values: { all: () => AllValue; each: () => EachValue }) => void;
};

export function withDeps<AllValue, EachValue>({
  beforeAll: cbBeforeAll,
  afterAll: cbAfterAll,
  beforeEach: cbBeforeEach,
  afterEach: cbAfterEach,
  tests,
}: Params<AllValue, EachValue>) {
  const ref: { all?: AllValue; each?: EachValue } = {};

  // alls
  if (cbBeforeAll) {
    beforeAll(async () => {
      ref.all = await cbBeforeAll();
    });
  }

  afterAll(async () => {
    const allValue = ref.all!;
    ref.all = undefined;
    if (cbAfterAll) await cbAfterAll(allValue);
  });

  // eaches
  if (cbBeforeEach) {
    beforeEach(async () => {
      ref.each = await cbBeforeEach();
    });
  }

  afterEach(async () => {
    const eachValue = ref.each!;
    ref.each = undefined;
    if (cbAfterEach) await cbAfterEach(eachValue);
  });

  tests({
    all: () => assert(ref.all, `All called outside test`),
    each: () => assert(ref.each, `Each called outside test`),
  });
}
