import { useCallback, useEffect, useMemo, useRef } from "react";
import { useForceUpdate } from "./useForceUpdate";

export function useHashMap<K, V>(): [
  Map<K, V>,
  (key: K, value: V) => void,
  (key: K) => void,
  number,
] {
  const forceUpdate = useForceUpdate();
  const { current: hashMap } = useRef(useMemo(() => new Map<K, V>(), []));
  const lastModified = useRef(Date.now());
  const timeout = useRef<NodeJS.Timeout>();

  useEffect(
    () => () => timeout.current ? clearTimeout(timeout.current) : undefined,
    [],
  );

  // Batch updates for performance reasons
  const scheduleUpdate = useCallback(() => {
    if (timeout.current) return;
    timeout.current = setTimeout(() => {
      forceUpdate();
      timeout.current = undefined;
    }, 50);
  }, [forceUpdate]);

  const set = useCallback(
    (key: K, value: V) => {
      hashMap.set(key, value);
      lastModified.current = Date.now();
      scheduleUpdate();
    },
    [hashMap, scheduleUpdate],
  );

  const remove = useCallback(
    (key: K) => {
      hashMap.delete(key);
      lastModified.current = Date.now();
      scheduleUpdate();
    },
    [hashMap, scheduleUpdate],
  );

  return [hashMap, set, remove, lastModified.current];
}
