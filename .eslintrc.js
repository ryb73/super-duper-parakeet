"use strict";

module.exports = {
  extends: `@ryb73`,

  overrides: [
    {
      files: [`src/**/*`, `jest.config.*`],
      rules: {
        "import/no-unused-modules": `off`,
      },
    },
  ],

  rules: {
    // This plugin is throwing an error
    "etc/no-internal": `off`,
    "etc/no-misused-generics": `off`,

    "no-console": [`warn`, { allow: [`warn`, `error`] }],

    // Incompatible with old versions of Safari. Remove this in maybe a year?
    "unicorn/prefer-string-replace-all": `off`,
  },
};
