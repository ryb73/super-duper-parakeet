import { forceDecode } from "../io/forceDecode";
import { apiRequest } from "./apiRequest";
import type { Config } from "./types";
import { Account } from "./types";

export async function getAccount(config: Config) {
  const result = await apiRequest(config, `get`, `/me/account`);
  return forceDecode(Account, result);
}
