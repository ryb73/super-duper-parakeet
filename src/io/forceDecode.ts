import { getOrElse, left } from "fp-ts/lib/Either";
import type { invalid } from "invalid-type";
import type { Decode, Errors, Type } from "io-ts";
import reporter from "io-ts-reporters";

export class DecodeError extends Error {
  public value: unknown;
  public report: string;

  public constructor(message: string, value: unknown, report: string) {
    super(message); // 'Error' breaks prototype chain here
    Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
    // eslint-disable-next-line unicorn/custom-error-definition
    this.name = `DecodeError`;

    this.value = value;
    this.report = report;
  }
}

// It's easy to accidentally pass an unawaited promise as a value, which will always result in failure.
function forceDecode<A, O, I>(
  typeOrDecoder: Decode<I, A> | Type<A, O, I>,
  value: Promise<any>,
  message?: string,
): invalid<"Passed promise as value. Did you mean to await the value?">;

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
    throw new DecodeError(
      `${message ? `[${message}] ` : ``}Decode failed:
          ${JSON.stringify(value)}
          ${JSON.stringify(report)}
        `,
      value,
      JSON.stringify(report),
    );
  })(decoded);
}
export { forceDecode, forceDecode as fd };
