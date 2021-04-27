import type { NextApiRequest, NextApiResponse } from "next";

export function runMiddleware<Response, MWResult>(
  req: NextApiRequest,
  res: NextApiResponse<Response>,
  fn: (
    req: NextApiRequest,
    res: NextApiResponse<Response>,
    next: (result: MWResult) => void,
  ) => void,
) {
  return new Promise<MWResult>((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        reject(result);
        return;
      }

      resolve(result);
    });
  });
}
