import type { RefObject } from "react";
import { useEffect } from "react";

export function useAsyncEffect(
  effect: (canceled: RefObject<boolean>) => Promise<(() => void) | void>,
) {
  useEffect(() => {
    const canceled = { current: false };

    let destructor: (() => void) | void;

    // eslint-disable-next-line no-void
    void effect(canceled).then((result) => {
      if (canceled.current && result) {
        console.warn(
          `[warning] useAsyncEffect: destructor ignored after effect is canceled`,
        );
      }

      destructor = result;
      return undefined;
    });

    return () => {
      canceled.current = true;
      if (destructor) destructor();
    };
  }, [effect]);
}
