import { parseJson } from "../src/parseJson.js";

test(`json`, () => {
  expect(parseJson(`"hot dog"`)).toBe(`hot dog`);
});

test(`non-json`, () => {
  expect(parseJson(`hot dog`)).toBeUndefined();
});
