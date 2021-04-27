type Def = {
  type?: string;
  name: string;
};

type TestDef<T> = Def & {
  type?: "test";
  name: string;
  callback: (value: T) => void;
};

type DescribeDef<T> = Def & {
  type: "describe";
  tests: (DescribeDef<T> | TestDef<T>)[];
};

type Tests<T> = (DescribeDef<T> | TestDef<T>)[];

function registerTests<T>(
  tests: Tests<T>,
  getValue: () => T,
  timeout: number | undefined,
) {
  tests.forEach((def) => {
    switch (def.type) {
      case undefined:
      case `test`:
        it(def.name, () => def.callback(getValue()), timeout);
        break;
      case `describe`:
        describe(def.name, () => registerTests(def.tests, getValue, timeout));
        break;
    }
  });
}

type Params<T> = {
  beforeAll?: () => PromiseLike<T> | T;
  afterAll?: (value: T) => void;
  tests: Tests<T>;
  timeout?: number;
};

export function withDeps<T>(params: Params<T>) {
  const {
    beforeAll: cbBeforeAll,
    afterAll: cbAfterAll,
    tests,
    timeout,
  } = params;

  let value: T | undefined;

  if (cbBeforeAll)
    beforeAll(async () => {
      value = await cbBeforeAll();
    });

  if (cbAfterAll) afterAll(() => cbAfterAll(value!));

  registerTests(tests, () => value!, timeout);
}
