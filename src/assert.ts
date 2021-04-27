export function assert<T>(v: T | null | undefined, message?: string) {
  if (!v) throw new Error(`Assertion failed${message ? ` ${message}` : ``}`);
  return v;
}
