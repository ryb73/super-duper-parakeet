import type { Branded } from "io-ts";
import { brand, string } from "io-ts";
import { NonEmptyString } from "io-ts-types";

export function brandedString<Brand extends { readonly [K in string]: symbol }>(
  name: string,
) {
  return brand(string, (v): v is Branded<string, Brand> => string.is(v), name);
}

export function brandedNonEmptyString<
  Brand extends { readonly [K in string]: symbol },
>(name: string) {
  return brand(
    NonEmptyString,
    (v): v is Branded<NonEmptyString, Brand> => NonEmptyString.is(v),
    name,
  );
}
