/* eslint-disable unicorn/prefer-module */

"use strict";

module.exports = {
  extends: `@ryb73`,

  ignorePatterns: [`lib/`, `.yarn/`, `coverage/`],

  overrides: [
    {
      files: [`./.eslintrc.js`],
      parserOptions: {
        sourceType: `script`,
      },
    },
  ],

  parserOptions: {
    sourceType: `module`,
  },

  rules: {
    "prefer-destructuring": `off`,
  },
};
