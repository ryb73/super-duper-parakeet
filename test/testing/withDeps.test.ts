import { withDeps } from "../../src/testing/withDeps";

withDeps({
  tests: [
    {
      name: `value`,
      callback: (v) => expect(v).toBe(1234),
    },
    {
      type: `describe`,
      name: `describe`,
      tests: [
        {
          name: `test`,
          callback: (v) => expect(v).toBe(1234),
        },
      ],
    },
  ],
  beforeAll: () => 1234,
});
