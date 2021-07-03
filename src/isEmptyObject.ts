export function isEmptyObject(v: unknown): v is Record<string, never> {
  return typeof v === `object` && v !== null && Object.keys(v).length === 0;
}
