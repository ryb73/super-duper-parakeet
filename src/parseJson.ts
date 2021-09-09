import type { Json } from "io-ts-types";

export function parseJson(s: string) {
  try {
    return JSON.parse(s) as Json;
  } catch {
    return undefined;
  }
}
