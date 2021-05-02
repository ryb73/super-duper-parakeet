/* eslint-disable unicorn/prefer-module */

"use strict";

module.exports = {
  extends: `@ryb73`,

  ignorePatterns: [`lib/`],

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
};
