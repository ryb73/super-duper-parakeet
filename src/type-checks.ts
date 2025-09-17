/** @deprecated Prefer `defined` */
export function assert<T>(v: T | null | undefined, message?: string) {
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (!v) throw new Error(`Assertion failed${message ? ` ${message}` : ``}`);
  return v;
}

function isDefined<T>(value: T | null | undefined | void): value is T {
  return value != null;
}
export { isDefined };

export function defined<T>(
  v: T | null | undefined | void,
  message?: string,
): T {
  if (v != null) return v;

  throw new Error(`Assertion failed${message != null ? `: ${message}` : ``}`);
}

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
function isNull<T>(value: T | null): value is null {
  return value === null;
}
export { isNull, isNull as n };
