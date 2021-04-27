/* eslint-disable unicorn/prefer-module, strict */

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

  rules: {
    "init-declarations": `off`,
  },
};
