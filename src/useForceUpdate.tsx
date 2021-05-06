import { useCallback, useState } from "react";

export function useForceUpdate() {
  const [, set] = useState({});
  return useCallback(() => set({}), []);
}
