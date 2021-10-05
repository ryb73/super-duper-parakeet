export type RenameKey<
  T extends Record<string, any>,
  Old extends string,
  New extends string,
> = Old extends keyof T ? Omit<T, Old> & Record<New, T[Old]> : T;
