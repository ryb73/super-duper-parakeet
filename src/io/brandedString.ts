import type { Branded } from "io-ts";
import { brand, string } from "io-ts";

export function brandedString<Brand extends { readonly [K in string]: symbol }>(
  name: string,
) {
  return brand(string, (v): v is Branded<string, Brand> => string.is(v), name);
}
