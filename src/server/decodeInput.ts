import { pipe } from "fp-ts/function";
import { fold } from "fp-ts/lib/Either";
import type { Errors, Type } from "io-ts";
import type { NextApiRequest, NextApiResponse } from "next";

type Options = {
  onError?: (errors: Errors) => void;
};

export function decodeInput<
  A,
  O,
  Data extends Record<string, unknown> | undefined = undefined
>(
  T: Type<A, O>,
  getInput: (req: NextApiRequest) => unknown,
  { onError }: Options = {},
) {
  return (
    handler: (
      req: NextApiRequest,
      res: NextApiResponse,
      data: Data & { input: A },
    ) => Promise<void> | void,
  ) => (req: NextApiRequest, res: NextApiResponse, data?: Data) => {
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
