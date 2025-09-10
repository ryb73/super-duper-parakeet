import { isLeft } from "fp-ts/lib/Either.js";
import { Type, failure, nullType, string, success } from "io-ts";

export const NullFromString = new Type<null, string, unknown>(
  `NullFromString`,
  nullType.is,
  (u, c) => {
    const stringValidation = string.validate(u, c);
    if (isLeft(stringValidation)) return stringValidation;

    return stringValidation.right !== `null` ? failure(u, c) : success(null);
  },
  String,
);
