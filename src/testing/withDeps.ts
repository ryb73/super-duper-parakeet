import { assert } from "../assert";

type Params<AllValue> = {
  beforeAll?: () => AllValue | PromiseLike<AllValue>;
  afterAll?: (value: AllValue) => void;
  tests: (values: { all: () => AllValue }) => void;
  timeout?: number;
};

export function withDeps<T>(params: Params<T>) {
  const { beforeAll: cbBeforeAll, afterAll: cbAfterAll, tests } = params;

  let value: T | undefined;

  if (cbBeforeAll) {
    beforeAll(async () => {
      value = await cbBeforeAll();
    });

    afterAll(() => {
      value = undefined;
    });
  }

  if (cbAfterAll) afterAll(() => cbAfterAll(value!));

  tests({ all: () => assert(value) });
}
