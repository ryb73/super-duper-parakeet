export function recordEntries<K extends number | string | symbol, V>(
  record: Record<K, V>,
): [K, V][] {
  return (Object.entries(record) as unknown) as [K, V][];
}
