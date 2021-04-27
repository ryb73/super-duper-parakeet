export type MakeKeysRequired<
  T extends Record<string, unknown>,
  K extends string
> = Partial<Omit<T, K>> & Required<Pick<T, K>>;
