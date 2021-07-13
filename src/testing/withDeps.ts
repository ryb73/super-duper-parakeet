import { assert } from "../assert";

type ValueFn<T> = () => PromiseLike<T> | T;

type Params<AllValue, EachValue> = {
  beforeAll?: ValueFn<AllValue>;
  afterAll?: (value: AllValue) => void;
  beforeEach?: ValueFn<EachValue>;
  afterEach?: (value: EachValue) => void;
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

  afterAll(() => {
    if (cbAfterAll) cbAfterAll(assert(ref.all));
    ref.all = undefined;
  });

  // eaches
  if (cbBeforeEach) {
    beforeEach(async () => {
      ref.each = await cbBeforeEach();
    });
  }

  afterEach(() => {
    if (cbAfterEach) cbAfterEach(assert(ref.each));
    ref.each = undefined;
  });

  tests({
    all: () => assert(ref.all, `All called outside test`),
    each: () => assert(ref.each, `Each called outside test`),
  });
}
