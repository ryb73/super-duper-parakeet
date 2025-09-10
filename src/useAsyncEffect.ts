import { useEffect } from "react";
import { isDefined } from "./type-checks.js";

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
      if (canceled.current && isDefined(result)) {
        console.warn(
          `[warning] useAsyncEffect: destructor ignored after effect is canceled`,
        );
      }

      destructor = result;
      return undefined;
    });

    return () => {
      canceled.current = true;
      if (isDefined(destructor)) destructor();
    };
  }, [effect]);
}
