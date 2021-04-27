import { chain } from "fp-ts/lib/Either";
import { pipe } from "fp-ts/lib/pipeable";
import { Type, failure, nullType, string, success } from "io-ts";

export const NullFromString = new Type<null, string, unknown>(
  `NullFromString`,
  nullType.is,
  (u, c) =>
    pipe(
      string.validate(u, c),
      chain((s) => (s !== `null` ? failure(u, c) : success(null))),
    ),
  String,
);
