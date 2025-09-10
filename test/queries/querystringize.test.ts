import { querystringize } from "../../src/queries/querystringize.js";

test(`base`, () => {
  expect(
    querystringize({
      bool: true,
      nul: null,
      num: 1,
      str: `stringinging`,
      und: undefined,
    }),
  ).toStrictEqual({
    bool: `true`,
    nul: `null`,
    num: `1`,
    str: `stringinging`,
    und: `undefined`,
  });
});

test(`strategy`, () => {
  expect(
    querystringize(
      {
        num: 1,
        str: `stringinging`,
        nul: null,
        und: undefined,
      },
      (key, value) => {
        if (value === null) return { [`${key}Null`]: `true` };
        if (value === undefined) return {};
        return { [key]: String(value) };
      },
    ),
  ).toStrictEqual({
    num: `1`,
    str: `stringinging`,
    nulNull: `true`,
  });
});
