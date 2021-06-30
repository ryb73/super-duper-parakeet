import {
  Type,
  nullType,
  success,
  undefined as undefinedType,
  union,
} from "io-ts";

function CoalesceNullToUndefined<A, O, I>(T: Type<A, O, I>) {
  return new Type<A | undefined, A | undefined, A | null | undefined>(
    `CoalesceNullToUndefined`,
    (v): v is A | undefined => v === undefined || T.is(v),
    (v) => (v === null ? success(undefined) : success(v)),
    (v) => v,
  );
}

export function nullable<A, O>(T: Type<A, O>) {
  return union([nullType, undefinedType, T]).pipe(CoalesceNullToUndefined(T));
}
