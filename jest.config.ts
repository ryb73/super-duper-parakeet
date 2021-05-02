import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  testPathIgnorePatterns: [`/lib/`],
  transform: {
    "^.+\\.(ts|tsx)$": `ts-jest`,
  },
};

export default config;
