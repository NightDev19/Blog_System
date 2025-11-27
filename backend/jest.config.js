// jest.config.cjs
/** @type {import('jest').Config} */
export default {
  testEnvironment: "node",
  verbose: true,
  testMatch: ["**/__test__/**/*.js?(x)", "**/?(*.)+(spec|test).js?(x)"],
};
