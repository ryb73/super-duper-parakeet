import { defined } from "../type-checks.js";

type ValueFn<T> = () => PromiseLike<T> | T;

export type TestRunnerFunctions = {
  afterAll: (cb: () => Promise<void>) => void;
  afterEach: (cb: () => Promise<void>) => void;
  beforeAll: (cb: () => Promise<void>) => void;
  beforeEach: (cb: () => Promise<void>) => void;
};

type Params<AllValue, EachValue> = {
  // The afters accept both PromiseLike and void. There's risk that a poorly-formed PromiseLike object is
  // accepted as void type by Typescript, but I'm leaving as is because switching void to undefined would
  // make using afterAll annoying, and since this is a testing utility, errors are likely to be caught anyway.
  afterAll?: (value: AllValue) => PromiseLike<void> | void;
  afterEach?: (value: EachValue) => PromiseLike<void> | void;
  beforeAll?: ValueFn<AllValue>;
  beforeEach?: ValueFn<EachValue>;
  testRunnerFunctions?: TestRunnerFunctions;
  tests: (values: { all: () => AllValue; each: () => EachValue }) => void;
};

export function withDeps<AllValue, EachValue>({
  afterAll: cbAfterAll,
  afterEach: cbAfterEach,
  beforeAll: cbBeforeAll,
  beforeEach: cbBeforeEach,
  testRunnerFunctions = { afterAll, afterEach, beforeAll, beforeEach },
  tests,
}: Params<AllValue, EachValue>) {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const { afterAll, afterEach, beforeAll, beforeEach } = testRunnerFunctions;

  const ref: { all?: AllValue; each?: EachValue } = {};

  // alls
  if (cbBeforeAll != null) {
    beforeAll(async () => {
      ref.all = await cbBeforeAll();
    });
  }

  afterAll(async () => {
    const allValue = ref.all!;
    ref.all = undefined;
    if (cbAfterAll != null) await cbAfterAll(allValue);
  });

  // eaches
  if (cbBeforeEach != null) {
    beforeEach(async () => {
      ref.each = await cbBeforeEach();
    });
  }

  afterEach(async () => {
    const eachValue = ref.each!;
    ref.each = undefined;
    if (cbAfterEach != null) await cbAfterEach(eachValue);
  });

  tests({
    all: () => defined(ref.all, `All called outside test`),
    each: () => defined(ref.each, `Each called outside test`),
  });
}
