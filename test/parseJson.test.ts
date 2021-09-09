import { parseJson } from "../src/parseJson";

test(`json`, () => {
  expect(parseJson(`"hot dog"`)).toBe(`hot dog`);
});

test(`non-json`, () => {
  expect(parseJson(`hot dog`)).toBeUndefined();
});
