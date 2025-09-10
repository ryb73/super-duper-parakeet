import { reduce } from "lodash-es";

type InValue = boolean | number | string | null | undefined;

type Strategy = (key: string, value: InValue) => Record<string, string>;

// eslint-disable-next-line func-style
export const defaultStrategy: Strategy = (key, value) => ({
  [key]: String(value),
});

export function querystringize<T extends Record<string, InValue>>(
  record: T,
  strategy: Strategy = defaultStrategy,
) {
  return reduce<T, Record<string, string>>(
    record,
    (acc, value, key) => ({
      ...acc,
      ...strategy(key, value),
    }),
    {},
  );
}
