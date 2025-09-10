export function assert(result: boolean, message?: string): asserts result {
  if (!result)
    throw new Error(`Assertion failed${message != null ? `: ${message}` : ``}`);
}
