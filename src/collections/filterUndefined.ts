import { isDefined } from "../type-checks";

/**
 * @deprecated Use `.filter(isDefined)` instead
 */
export function filterUndefined<T>(arr: (T | null | undefined)[]): T[] {
  return arr.filter((v) => isDefined(v)) as T[];
}
