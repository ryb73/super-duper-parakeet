import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  restoreMocks: true,
  testEnvironment: `jsdom`,
  testPathIgnorePatterns: [`/lib/`],
  transform: {
    "^.+\\.(ts|tsx)$": `ts-jest`,
  },
};

export default config;
