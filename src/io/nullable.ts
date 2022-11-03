import type { Mixed } from "io-ts";
import { nullType, union } from "io-ts";

// eslint-disable-next-line @typescript-eslint/no-redeclare
export function nullable<T extends Mixed>(T: T) {
  return union([nullType, T]);
}
