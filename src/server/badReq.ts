import type { NextApiResponse } from "next";

export function badReq(res: NextApiResponse<true>) {
  res.status(400);
  res.end();
}
