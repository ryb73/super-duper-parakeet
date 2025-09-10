import { useEffect } from "react";

type CanceledRef = {
  readonly current: boolean;
};

export function useAsyncEffect(
  effect: (canceled: CanceledRef) => Promise<(() => void) | void>,
) {
  useEffect(() => {
    const canceled = { current: false };

    let destructor: (() => void) | void;

    void effect(canceled).then((result) => {
      if (canceled.current && result != null) {
        console.warn(
          `[warning] useAsyncEffect: destructor ignored after effect is canceled`,
        );
      }

      destructor = result;
      return undefined;
    });

    return () => {
      canceled.current = true;
      if (destructor != null) destructor();
    };
  }, [effect]);
}
