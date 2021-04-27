/* eslint-disable no-console */
import { useEffect, useMemo, useState } from "react";

export function useWatchValue(name: string, v: unknown) {
  useEffect(() => {
    console.debug(`updated ${name}:`, v);
  }, [name, v]);
}

export function useWatchValues(name: string, vs: Record<string, unknown>) {
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

    console.debug(
      `${previousValues ? `updated` : `initial watch`} ${name}:`,
      Object.fromEntries(changedEntries),
    );

    setPreviousValues(memoedVs);
  }, [memoedVs, name, previousValues]);
}
