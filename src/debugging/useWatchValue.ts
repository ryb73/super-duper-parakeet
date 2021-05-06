/* eslint-disable no-console */
import { useEffect, useMemo, useState } from "react";
import { useGetter } from "../useGetter";

type Options = {
  log?: (message: string, values: Record<string, unknown>) => void;
};

export function useWatchValue(name: string, v: unknown, { log }: Options = {}) {
  const effectiveLog = useMemo(() => log ?? console.debug.bind(console), [log]);
  const getLog = useGetter(effectiveLog);

  useEffect(() => {
    getLog()(`updated ${name}:`, v);
  }, [getLog, name, v]);
}

export function useWatchValues(
  name: string,
  vs: Record<string, unknown>,
  { log }: Options = {},
) {
  const effectiveLog = useMemo(() => log ?? console.debug.bind(console), [log]);
  const getLog = useGetter(effectiveLog);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const memoedVs = useMemo(() => vs, Object.values(vs));

  const [previousValues, setPreviousValues] = useState<
    Record<string, unknown>
  >();

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
