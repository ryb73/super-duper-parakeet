import { withDeps } from "../../src/testing/withDeps";

describe(`all`, () => {
  describe(`base`, () => {
    withDeps({
      tests: ({ all }) => {
        test(`value`, () => expect(all()).toBe(1234));

        describe(`describe`, () => {
          test(`test`, () => expect(all()).toBe(1234));
        });
      },
      beforeAll: () => 1234,
      afterAll: (v) => expect(v).toBe(1234),
    });
  });

  // Tests that the afterAll promise is awaited
  describe(`after promise`, () => {
    let setThenned: () => void;
    const thenned = new Promise<void>((resolve) => {
      setThenned = resolve;
    });

    withDeps({
      tests: ({ all }) => {
        test(`value`, () => expect(all()).toBe(1234));
      },
      beforeAll: () => 1234,
      afterAll: () => ({
        then: (fn) => {
          setThenned();
          return Promise.resolve(fn!());
        },
      }),
    });

    afterAll(async () => thenned);
  });
});

describe(`each`, () => {
  describe(`base`, () => {
    withDeps({
      tests: ({ each }) => {
        test(`value`, () => expect(each()).toBe(1234));

        describe(`describe`, () => {
          test(`test`, () => expect(each()).toBe(1234));
        });
      },
      beforeEach: () => 1234,
      afterEach: (v) => expect(v).toBe(1234),
    });
  });

  // Tests that the afterEach promise is awaited
  describe(`after promise`, () => {
    let setThenned: () => void;
    const thenned = new Promise<void>((resolve) => {
      setThenned = resolve;
    });

    withDeps({
      tests: ({ each }) => {
        test(`value`, () => expect(each()).toBe(1234));
      },
      beforeEach: () => 1234,
      afterEach: () => ({
        then: (fn) => {
          setThenned();
          return Promise.resolve(fn!());
        },
      }),
    });

    afterAll(async () => thenned);
  });
});
