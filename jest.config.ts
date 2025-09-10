import path from "path";
import dotenv from "dotenv";
import type { Config } from "jest";
import { TS_EXT_TO_TREAT_AS_ESM, ESM_TS_TRANSFORM_PATTERN } from "ts-jest";

function loadEnv() {
  const local = dotenv.config({
    path: path.resolve(process.cwd(), `.env.test.local`),
  });
  if (local.error == null) return;
  dotenv.config({ path: path.resolve(process.cwd(), `.env.test`) });
}
loadEnv();

export default {
  extensionsToTreatAsEsm: [...TS_EXT_TO_TREAT_AS_ESM],
  moduleNameMapper: {
    "(.+)\\.js": `$1`,
    "^lodash-es$": "lodash",
  },
  restoreMocks: true,
  testEnvironment: `jsdom`,
  testPathIgnorePatterns: [`/lib/`],
  transform: {
    [ESM_TS_TRANSFORM_PATTERN]: [`ts-jest`, { useESM: true }],
  },
} satisfies Config;
