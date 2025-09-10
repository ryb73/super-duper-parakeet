import type { Either } from "fp-ts/lib/Either.js";
import { getOrElse } from "fp-ts/lib/Either.js";
import { pipe } from "fp-ts/lib/function.js";

export function forceEither<A>(either: Either<unknown, A>): A {
  return pipe(
    either,
    getOrElse<unknown, A>((e) => {
      throw new Error(`Expected right, got left: ${JSON.stringify(e)}`);
    }),
  );
}
