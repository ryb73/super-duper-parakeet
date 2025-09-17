/* eslint-disable import/no-deprecated */
// eslint-disable-next-line @typescript-eslint/no-shadow
import { expect, test } from "@jest/globals";
import { filterUndefined } from "../../src/collections/filterUndefined.js";

test(`filterUndefined`, () => {
  const arr: string[] = filterUndefined([`a`, `b`, null, undefined, ``, `c`]);
  expect(arr).toStrictEqual([`a`, `b`, ``, `c`]);
});
