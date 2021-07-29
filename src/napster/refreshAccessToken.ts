import axios from "axios";
import type { TypeOf } from "io-ts";
import { Int, exact, string, type } from "io-ts";
import { forceDecode } from "../io/forceDecode";

const External = exact(
  type({
    access_token: string,
    expires_in: Int,
    refresh_token: string,
  }),
);
// eslint-disable-next-line @typescript-eslint/no-redeclare
type External = TypeOf<typeof External>;

export async function refreshAccessToken(
  apiKey: string,
  secret: string,
  redirectUri: string,
  refreshToken: string,
): Promise<External> {
  const { data } = await axios.post<unknown>(
    `https://api.napster.com/oauth/access_token`,
    {
      client_id: apiKey,
      client_secret: secret,
      grant_type: `refresh_token`,
      redirect_uri: redirectUri,
      refresh_token: refreshToken,
    },
  );

  return forceDecode(External, data);
}
