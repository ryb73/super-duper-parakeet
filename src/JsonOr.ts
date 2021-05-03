export type JsonOr<T> =
  | JsonArrayOr<T>
  | JsonRecordOr<T>
  | T
  | boolean
  | number
  | string
  | null;

// eslint-disable-next-line @typescript-eslint/ban-types
export type JsonArrayOr<T> = readonly JsonOr<T>[] & {};

// eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
export type JsonRecordOr<T> = {
  readonly [key: string]: JsonOr<T>;
};
