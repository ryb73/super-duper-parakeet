import { forceDecode } from "../io/forceDecode.js";
import { apiRequest } from "./apiRequest.js";
import type { Config } from "./types.js";
import { Account } from "./types.js";

export async function getAccount(config: Config) {
  const result = await apiRequest(config, `get`, `/me/account`);
  return forceDecode(Account, result);
}
