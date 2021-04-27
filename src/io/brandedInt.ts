import type { Branded } from "io-ts";
import { Int, brand, union } from "io-ts";
import { IntFromString } from "io-ts-types";

export function brandedInt<Brand extends { readonly [K in string]: symbol }>(
  name: string,
) {
  return brand(
    union([Int, IntFromString]),
    (v): v is Branded<Int, Brand> => Int.is(v),
    name,
  );
}
