import { isEmptyObject } from "../src/isEmptyObject.js";

test(`true`, () => {
  expect(isEmptyObject({})).toBe(true);
});

describe(`false`, () => {
  test(`object`, () => expect(isEmptyObject({ a: 5 })).toBe(false));
  test(`number`, () => expect(isEmptyObject(5)).toBe(false));
  test(`string`, () => expect(isEmptyObject(`null`)).toBe(false));
  test(`function`, () => expect(isEmptyObject(() => ({}))).toBe(false));
  test(`boolean`, () => expect(isEmptyObject(true)).toBe(false));
  test(`undefined`, () => expect(isEmptyObject(undefined)).toBe(false));
  test(`symbol`, () => expect(isEmptyObject(Symbol(`s`))).toBe(false));
  test(`bigint`, () => expect(isEmptyObject(BigInt(49))).toBe(false));
});
