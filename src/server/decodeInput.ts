import { isLeft } from "fp-ts/lib/Either";
import type { Errors, Type } from "io-ts";

type Options = {
  onError?: (errors: Errors) => void;
};

export type MinimalResponse = {
  status: (code: number) => void;
  end: () => void;
};

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
interface InputObject<T> extends Record<string, unknown> {
  input: T;
}

export function decodeInput<A, O, Req, Res extends MinimalResponse>(
  T: Type<A, O>,
  getInput: (req: Req) => unknown,
  { onError }: Options = {},
) {
  return <DataWithInput extends InputObject<A>>(
    handler: (req: Req, res: Res, data: DataWithInput) => Promise<void> | void,
  ) => (req: Req, res: Res, data: Omit<DataWithInput, "input">) => {
    const decoded = T.decode(getInput(req));

    if (isLeft(decoded)) {
      if (onError) onError(decoded.left);

      res.status(400);
      res.end();
      return undefined;
    }

    const newData = { ...data, input: decoded.right } as DataWithInput;
    return handler(req, res, newData);
  };
}
