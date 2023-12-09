/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleDirectories: ["src", "node_modules"],
  moduleNameMapper: {
    // maps e.g. `@/util/test` to `src/test`
    "^@/(.*)": "<rootDir>/src/$1",
  },
  // todo the tests are very slow. This might fix it, but leads to other
  // problems. See
  // https://stackoverflow.com/questions/45087018/jest-simple-tests-are-slow
  // note that that link says to use `global`, but that's deprecated and we need
  // to use `transform` instead
  // transform: {
  //   "\\.spec.ts": ["ts-jest", { isolatedModules: true }],
  // },
};
