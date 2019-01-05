const OFF = 0;
const WARN = 1;
const ERROR = 2;

module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true
  },
  extends: ["eslint:recommended", "prettier/react", "prettier/standard"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: "module"
  },
  plugins: ["react", "react-native", "prettier"],
  rules: {
    "no-extra-semi": OFF,
    "no-mixed-spaces-and-tabs": OFF,
    "no-unexpected-multiline": OFF
  }
};
