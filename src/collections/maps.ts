import { enableMapSet, produce } from "immer";

enableMapSet();

export type ValueOfMap<T extends Map<unknown, unknown>> = T extends Map<
  unknown,
  infer V
>
  ? V
  : never;

export function keyByMap<K, V>(arr: V[], getKey: (v: V) => K): Map<K, V> {
  return arr.reduce(
    (acc, v) =>
      produce(acc, (tmpMap: Map<K, V>) => {
        tmpMap.set(getKey(v), v);
        return tmpMap;
      }),
    new Map<K, V>(),
  );
}
