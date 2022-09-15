import type { ForwardedRef } from "react";

export function setForwardedRef<T>(forwardedRef: ForwardedRef<T>, value: T) {
  if (forwardedRef === null) return;

  if (typeof forwardedRef === `function`) {
    forwardedRef(value);
  } else {
    forwardedRef.current = value;
  }
}
