import type { Method } from "axios";
import axios from "axios";
import type { Config } from "./types.js";

export async function apiRequest(
  { apiKey, accessToken }: Config,
  method: Method,
  path: string,
  query?: Record<string, string>,
) {
  const { data } = await axios.request<unknown>({
    url: `https://api.napster.com/v2.2${path}`,
    method,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    params: { ...query, apikey: apiKey },
  });

  return data;
}
