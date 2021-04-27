import type { NextApiRequest, NextApiResponse } from "next";

type Options = {
  onError?: (error: unknown) => void;
};

function method(
  m: string,
  handler: (
    req: NextApiRequest,
    res: NextApiResponse<unknown>,
  ) => Promise<void> | void,
  { onError }: Options = {},
) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== m) {
      res.status(405);
      res.end();
      return;
    }

    try {
      await handler(req, res);
    } catch (error: unknown) {
      if (onError) onError(error);

      res.status(500);
      res.end();
    }
  };
}

export function get(options?: Options) {
  return (
    handler: (
      req: NextApiRequest,
      res: NextApiResponse<unknown>,
    ) => Promise<void> | void,
  ) => method(`GET`, handler, options);
}

export function post(options?: Options) {
  return (
    handler: (
      req: NextApiRequest,
      res: NextApiResponse<unknown>,
    ) => Promise<void> | void,
  ) => method(`POST`, handler, options);
}

export function del(options?: Options) {
  return (
    handler: (
      req: NextApiRequest,
      res: NextApiResponse<unknown>,
    ) => Promise<void> | void,
  ) => method(`DELETE`, handler, options);
}
