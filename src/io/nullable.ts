import type { Type } from "io-ts";
import { nullType, undefined as undefinedType, union } from "io-ts";

export function nullable<A, O>(T: Type<A, O>) {
  return union([nullType, undefinedType, T]);
}
