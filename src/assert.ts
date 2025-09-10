import { isDefined } from "./type-checks.js";

export function assert(result: boolean, message?: string): asserts result {
  if (!result)
    throw new Error(
      `Assertion failed${isDefined(message) ? `: ${message}` : ``}`,
    );
}
