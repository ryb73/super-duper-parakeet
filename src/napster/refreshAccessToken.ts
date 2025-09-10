import axios from "axios";
import type { TypeOf } from "io-ts";
import { Int, strict, string } from "io-ts";
import { forceDecode } from "../io/forceDecode.js";

const ExternalTokens = strict({
  access_token: string,
  expires_in: Int,
  refresh_token: string,
});
type ExternalTokens = TypeOf<typeof ExternalTokens>;

export async function refreshAccessToken(
  apiKey: string,
  secret: string,
  redirectUri: string,
  refreshToken: string,
): Promise<ExternalTokens> {
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

  return forceDecode(ExternalTokens, data);
}
