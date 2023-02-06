/** @deprecated Prefer `defined` */
export function assert<T>(v: T | null | undefined, message?: string) {
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (!v) throw new Error(`Assertion failed${message ? ` ${message}` : ``}`);
  return v;
}

function isDefined<T>(value: T | null | undefined | void): value is T {
  return value !== null && value !== undefined;
}
export { isDefined };

export function defined<T>(
  v: T | null | undefined | void,
  message?: string,
): T {
  if (isDefined(v)) return v;

  throw new Error(
    `Assertion failed${isDefined(message) ? `: ${message}` : ``}`,
  );
}

function isNull<T>(value: T | null): value is null {
  return value === null;
}
export { isNull, isNull as n };
