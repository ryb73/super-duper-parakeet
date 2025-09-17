import { merge } from "lodash-es";

export function mergeImmutable<T1, T2>(v1: T1, v2: T2): T1 & T2;
export function mergeImmutable<T1, T2, T3>(
  v1: T1,
  v2: T2,
  v3: T3,
): T1 & T2 & T3;
export function mergeImmutable<T1, T2, T3, T4>(
  v1: T1,
  v2: T2,
  v3: T3,
  v4: T4,
): T1 & T2 & T3 & T4;
export function mergeImmutable<T extends Readonly<any>[]>(
  ...args: readonly T[]
) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return merge({}, ...args);
}
