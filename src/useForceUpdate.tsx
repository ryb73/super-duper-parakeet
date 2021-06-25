import { useCallback, useEffect, useRef, useState } from "react";

export function useForceUpdate() {
  const [, set] = useState({});

  const unmounted = useRef(false);

  useEffect(
    () => () => {
      unmounted.current = true;
    },
    [],
  );

  return useCallback(() => {
    if (!unmounted.current) set({});
  }, []);
}
