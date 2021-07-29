import path from "path";
import type { Config } from "@jest/types";
import dotenv from "dotenv";

function loadEnv() {
  const local = dotenv.config({
    path: path.resolve(process.cwd(), `.env.test.local`),
  });
  if (!local.error) return;
  dotenv.config({ path: path.resolve(process.cwd(), `.env.test`) });
}
loadEnv();

const config: Config.InitialOptions = {
  restoreMocks: true,
  testEnvironment: `jsdom`,
  testPathIgnorePatterns: [`/lib/`],
  transform: {
    "^.+\\.(ts|tsx)$": `ts-jest`,
  },
};

export default config;
