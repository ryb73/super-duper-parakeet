import { useCallback, useEffect, useRef } from "react";

export function useGetter<T>(value: T): () => T {
  const ref = useRef(value);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return useCallback(() => ref.current, []);
}
