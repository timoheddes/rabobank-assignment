// eslint-disable-next-line no-undef
module.exports = {
  coverageDirectory: '__tests__/coverage',
  coverageReporters: ['lcov', 'text', 'html'],
  collectCoverageFrom: [
    'src/*.{ts,tsx}',
    'src/**/*.{ts,tsx}',
    '!src/types/index.ts',
  ],
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  testPathIgnorePatterns: ['/node_modules/', '/test/e2e/'],
  testRegex: '(/test/.*|\\.(test|spec))\\.(ts|tsx|js)$',
  moduleFileExtensions: ['ts', 'tsx', 'js'],
};
