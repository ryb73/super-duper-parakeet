/** @deprecated Prefer `defined` */
export function assert<T>(v: T | null | undefined, message?: string) {
  if (!v) throw new Error(`Assertion failed${message ? ` ${message}` : ``}`);
  return v;
}

export function defined<T>(v: T | null | undefined, message?: string): T {
  if (v === null || v === undefined)
    throw new Error(`Assertion failed${message ? `: ${message}` : ``}`);
  return v;
}

function isNull<T>(value: T | null): value is null {
  return value === null;
}
export { isNull, isNull as n };

function isDefined<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}
export { isDefined };
