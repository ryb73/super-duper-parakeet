import { isDefined } from "../type-checks.js";

/**
 * @deprecated Use `.filter(isDefined)` instead
 */
export function filterUndefined<T>(arr: (T | null | undefined)[]): T[] {
  return arr.filter(isDefined);
}
