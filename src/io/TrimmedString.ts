import { isLeft } from "fp-ts/lib/Either";
import { Type, string, success } from "io-ts";

export const TrimmedString = new Type<string, string, unknown>(
  `TrimmedString`,
  string.is,
  (u, c) => {
    const stringValidation = string.validate(u, c);
    if (isLeft(stringValidation)) return stringValidation;

    return success(stringValidation.right.trim());
  },
  (v) => v.trim(),
);
