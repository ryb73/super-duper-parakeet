import { pipe } from "fp-ts/function";
import { fold } from "fp-ts/lib/Either";
import type { Errors, Type } from "io-ts";

type Options = {
  onError?: (errors: Errors) => void;
};

export type MinimalResponse = {
  status: (code: number) => void;
  end: () => void;
};

export function decodeInput<A, O, Req, Res extends MinimalResponse>(
  T: Type<A, O>,
  getInput: (req: Req) => unknown,
  { onError }: Options = {},
) {
  return <Data extends Record<string, unknown> | undefined>(
    handler: (
      req: Req,
      res: Res,
      data: Data & { input: A },
    ) => Promise<void> | void,
  ) => (req: Req, res: Res, data?: Data) => {
    const input = getInput(req);
    return pipe(
      T.decode(input),
      fold(
        (e) => {
          if (onError) onError(e);

          res.status(400);
          res.end();
        },
        (v) => {
          const newData = { ...(data || {}), input: v } as Data & {
            input: A;
          };
          return handler(req, res, newData);
        },
      ),
    );
  };
}
