import type { Int } from "io-ts";
import { one, zero } from "./constants.js";

export function addInt<T extends Int>(...ints: T[]): T {
  return ints.reduce((a, b) => (a + b) as Int, zero) as T;
}

export function subtractInt<T extends Int>(minuend: T, ...subtrahends: T[]): T {
  return subtrahends.reduce<Int>((a, b) => (a - b) as Int, minuend) as T;
}

export function multiplyInt<T extends Int>(...ints: T[]): T {
  return ints.reduce<Int>((a, b) => (a * b) as Int, one) as T;
}

export function minInt<T extends Int>(...values: T[]): T {
  return Math.min(...values) as unknown as T;
}

export function maxInt<T extends Int>(...values: T[]): T {
  return Math.max(...values) as unknown as T;
}

export function floor(n: number): Int {
  return Math.floor(n) as Int;
}

export function lengthInt(a: readonly unknown[]): Int {
  return a.length as Int;
}

export function parseIntStrong(s: string, radix = 10) {
  const n = Number.parseInt(s, radix);
  if (Number.isNaN(n)) {
    return null;
  }
  return n as Int;
}
