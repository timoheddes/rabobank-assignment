/* eslint-disable */
const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig.json');
module.exports = {
  coverageDirectory: '__tests__/coverage',
  preset: 'ts-jest',
  testEnvironment: 'node',
  coverageReporters: ['lcov', 'text', 'html'],
  collectCoverageFrom: [
    'src/*.{ts,tsx}',
    'src/**/*.{ts,tsx}',
    '!src/types/index.ts',
    '!src/cli/*',
    '!src/index.ts',
  ],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
  modulePaths: ['<rootDir>'],
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  testPathIgnorePatterns: ['/node_modules/', '/test/e2e/'],
  testRegex: '(/test/.*|\\.(test|spec))\\.(ts|tsx|js)$',
  moduleFileExtensions: ['ts', 'tsx', 'js'],
};
