import { withDeps } from "../../src/testing/withDeps";

describe(`all`, () => {
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

describe(`each`, () => {
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
