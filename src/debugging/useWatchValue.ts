/* eslint-disable no-console */
import throttle from "lodash/throttle";
import { useEffect, useMemo, useState } from "react";
import { useGetter } from "../useGetter";

export type Options = {
  log?: (message: string, values: Record<string, unknown>) => void;
  throttle?: boolean | number;
};

function useLog({ log, throttle: shouldThrottle }: Options = {}) {
  const effectiveLog = useMemo(() => {
    const fn = log ?? console.debug.bind(console);
    if (!shouldThrottle) return fn;

    return throttle(fn, shouldThrottle === true ? 1000 / 60 : shouldThrottle);
  }, [log, shouldThrottle]);

  return useGetter(effectiveLog);
}

export function useWatchValue(name: string, v: unknown, options: Options = {}) {
  const getLog = useLog(options);

  useEffect(() => {
    getLog()(`updated ${name}:`, v);
  }, [getLog, name, v]);
}

export function useWatchValues(
  name: string,
  vs: Record<string, unknown>,
  options: Options = {},
) {
  const getLog = useLog(options);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const memoedVs = useMemo(() => vs, Object.values(vs));

  const [previousValues, setPreviousValues] =
    useState<Record<string, unknown>>();

  useEffect(() => {
    const changedEntries = Object.entries(memoedVs).filter(
      ([vName, v]) => !previousValues || v !== previousValues[vName],
    );

    if (changedEntries.length === 0) return;

    getLog()(
      `${previousValues ? `updated` : `initial watch`} ${name}:`,
      Object.fromEntries(changedEntries),
    );

    setPreviousValues(memoedVs);
  }, [getLog, memoedVs, name, previousValues]);
}
