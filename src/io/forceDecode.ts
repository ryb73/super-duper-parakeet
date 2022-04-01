import { getOrElse, left } from "fp-ts/lib/Either";
import type { Decode, Errors, Type } from "io-ts";
import reporter from "io-ts-reporters";

// It's easy to accidentally pass an unawaited promise as a value, which will always result in failure.
function forceDecode<A, O, I>(
  typeOrDecoder: Decode<I, A> | Type<A, O, I>,
  value: Promise<any>,
  message?: string,
): never;

function forceDecode<A, O, I>(
  typeOrDecoder: Decode<I, A> | Type<A, O, I>,
  value: I,
  message?: string,
): A;

function forceDecode<A, O, I>(
  typeOrDecoder: Decode<I, A> | Type<A, O, I>,
  value: I,
  message?: string,
): A {
  const decode =
    typeof typeOrDecoder === `function` ? typeOrDecoder : typeOrDecoder.decode;

  const decoded = decode(value);

  return getOrElse<Errors, A>((err) => {
    const report = reporter.report(left(err));
    throw new Error(`${message ? `[${message}] ` : ``}Decode failed:
          ${JSON.stringify(value)}
          ${JSON.stringify(report)}
        `);
  })(decoded);
}
export { forceDecode, forceDecode as fd };
