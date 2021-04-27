import type { Either } from "fp-ts/lib/Either";
import { getOrElse } from "fp-ts/lib/Either";
import { pipe } from "fp-ts/lib/function";

export function forceEither<A>(either: Either<unknown, A>): A {
  return pipe(
    either,
    getOrElse<unknown, A>((e) => {
      throw new Error(`Expected right, got left: ${JSON.stringify(e)}`);
    }),
  );
}
