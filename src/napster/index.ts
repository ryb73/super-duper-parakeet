import axios from "axios";
import { forceDecode } from "../io/forceDecode";
import { Account } from "./types";

type Config = { apiKey: string; accessToken: string };

async function get(
  { apiKey, accessToken }: Config,
  path: string,
  params: Record<string, string> = {},
) {
  const query = new URLSearchParams({ ...params, apikey: apiKey }).toString();

  const { data } = await axios.get<unknown>(
    `https://api.napster.com/v2.2${path}?${query}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  return data;
}

export async function getAccount(config: Config): Promise<Account> {
  const result = await get(config, `/me/account`);
  return forceDecode(Account, result);
}
