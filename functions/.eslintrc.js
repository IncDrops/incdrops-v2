// This is your new file: functions/.eslintrc.js

module.exports = {
  env: {
    es6: true,
    node: true, // This is the important line
  },
  parserOptions: {
    ecmaVersion: 2020,
  },
  extends: [
    "eslint:recommended",
    "google",
  ],
  rules: {
    "no-restricted-globals": ["error", "name", "length"],
    "prefer-arrow-callback": "error",
    "quotes": ["error", "double", { "allowTemplateLiterals": true }],
    "max-len": ["error", { "code": 120 }], // Increased max line length
    "require-jsdoc": "off", // Turns off the "missing JSDoc" warning
    "valid-jsdoc": "off", // Turns off the "invalid JSDoc" warning
  },
  overrides: [
    {
      files: ["**/*.spec.*"],
      env: {
        mocha: true,
      },
      rules: {},
    },
  ],
  globals: {},
};