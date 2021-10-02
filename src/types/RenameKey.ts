export type RenameKey<
  T extends Record<string, any>,
  Old extends keyof T,
  New extends string,
> = Old extends keyof T ? Omit<T, Old> & Record<New, T[Old]> : never;
