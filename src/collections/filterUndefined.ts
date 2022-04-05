import { isDefined } from "../type-checks";

export function filterUndefined<T>(arr: (T | null | undefined)[]): T[] {
  return arr.filter((v) => isDefined(v)) as T[];
}
