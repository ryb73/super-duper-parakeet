import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  testEnvironment: `jsdom`,
  testPathIgnorePatterns: [`/lib/`],
  transform: {
    "^.+\\.(ts|tsx)$": `ts-jest`,
  },
};

export default config;
