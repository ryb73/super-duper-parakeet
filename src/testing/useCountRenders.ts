import { useEffect, useRef } from "react";

export function useCountRenders() {
  const ref = useRef(0);

  useEffect(() => {
    ++ref.current;
  });

  return ref;
}
