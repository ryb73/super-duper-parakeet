"use strict";

module.exports = {
  extends: `@ryb73`,

  ignorePatterns: [`lib/`, `.yarn/`, `coverage/`],

  rules: {
    "no-console": [`warn`, { allow: [`warn`, `error`] }],

    "promise/prefer-await-to-then": `off`,
    "prefer-destructuring": `off`,
  },
};
