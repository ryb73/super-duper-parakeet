import { withDeps } from "../../src/testing/withDeps";

withDeps({
  tests: ({ all }) => {
    test(`value`, () => expect(all()).toBe(1234));

    describe(`describe`, () => {
      test(`test`, () => expect(all()).toBe(1234));
    });
  },
  beforeAll: () => 1234,
});
