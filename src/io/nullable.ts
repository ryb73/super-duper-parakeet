import type { Mixed } from "io-ts";
import { nullType, union } from "io-ts";

export function nullable<T extends Mixed>(T: T) {
  return union([nullType, T]);
}
