import { isLeft } from "fp-ts/lib/Either";
import { Type, UnknownRecord, success } from "io-ts";
import { isDefined } from "../type-checks.js";

export function keyTranslator(keyMap: Record<string, string>, strict = true) {
  const reverseKeyMap = Object.entries(keyMap).reduce<Record<string, string>>(
    (acc, [key, value]) => ({ ...acc, [value]: key }),
    {},
  );

  return new Type<Record<string, unknown>, Record<string, unknown>>(
    `KeyTranslator`,
    (v): v is Record<string, unknown> => UnknownRecord.is(v),
    (v, context) => {
      const recordValidate = UnknownRecord.validate(v, context);
      if (isLeft(recordValidate)) return recordValidate;

      const result = Object.entries(recordValidate.right).reduce(
        (acc, [key, value]) =>
          isDefined(reverseKeyMap[key])
            ? {
                ...acc,
                [reverseKeyMap[key]!]: value,
              }
            : strict
            ? acc
            : { ...acc, [key]: value },
        {},
      );

      return success(result);
    },
    (v: Record<string, unknown>) =>
      Object.entries(v).reduce(
        (acc, [key, value]) =>
          isDefined(keyMap[key])
            ? {
                ...acc,
                [keyMap[key]!]: value,
              }
            : strict
            ? acc
            : { ...acc, [key]: value },
        {},
      ),
  );
}
