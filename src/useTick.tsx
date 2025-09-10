import { useCallback, useEffect, useState } from "react";

type Options = {
  onError?: (error: Error) => void;
};

export function useTick({ onError }: Options = {}) {
  const [interval, setTickInterval] = useState<NodeJS.Timeout>();

  const start = useCallback(
    (cb: () => void, ms: number) => {
      setTickInterval((curInterval) => {
        if (curInterval == null)
          return setInterval(() => {
            cb();
          }, ms);

        onError?.(new Error(`Tick already started`));

        return curInterval;
      });
    },
    [onError],
  );

  const clear = useCallback(() => {
    setTickInterval(undefined);
  }, []);

  // Be sure to clear interval on unmount, or if interval is unset (by clear)
  useEffect(
    () => () => {
      if (interval != null) clearInterval(interval);
    },
    [interval],
  );

  return [start, clear, interval !== undefined] as const;
}
