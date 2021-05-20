export type UnionOption<T1, T2> = T1 extends void
  ? T2
  : T2 extends void
  ? T1
  : T1 & T2;
