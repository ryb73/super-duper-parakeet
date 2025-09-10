/* eslint-disable import/no-deprecated */
import { filterUndefined } from "../../src/collections/filterUndefined.js";

test(`filterUndefined`, () => {
  const arr: string[] = filterUndefined([`a`, `b`, null, undefined, ``, `c`]);
  expect(arr).toStrictEqual([`a`, `b`, ``, `c`]);
});
