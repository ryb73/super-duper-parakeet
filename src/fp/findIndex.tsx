import { Int } from "io-ts";
import { forceDecode } from "../io/forceDecode";

export function findIndex<T>(a: T[], predicate: (v: T) => boolean): Int {
  return forceDecode(Int, a.findIndex(predicate));
}
