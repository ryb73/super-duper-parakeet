import path from "path";
import type { Config } from "@jest/types";
import dotenv from "dotenv";

function loadEnv() {
  const local = dotenv.config({
    path: path.resolve(process.cwd(), `.env.test.local`),
  });
  if (local.error == null) return;
  dotenv.config({ path: path.resolve(process.cwd(), `.env.test`) });
}
loadEnv();

const config: Config.InitialOptions = {
  extensionsToTreatAsEsm: [`.ts`],
  moduleNameMapper: {
    "(.+)\\.js": `$1`,
  },
  restoreMocks: true,
  testEnvironment: `jsdom`,
  testPathIgnorePatterns: [`/lib/`],
  transform: {
    "^.+\\.(ts|tsx)$": [`ts-jest`, { useESM: true }],
  },
};

export default config;
