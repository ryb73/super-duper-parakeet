import { filterUndefined } from "../../src/collections/filterUndefined";

test(`filterUndefined`, () => {
  const arr: string[] = filterUndefined([`a`, `b`, null, undefined, ``, `c`]);
  expect(arr).toStrictEqual([`a`, `b`, ``, `c`]);
});
