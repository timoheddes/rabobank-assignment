module.exports = {
  coverageDirectory: '__tests__/coverage',
  coverageReporters: ['lcov', 'html'],
  collectCoverageFrom: ['src/*.{ts,tsx}', 'src/**/*.{ts,tsx}'],
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  testPathIgnorePatterns: ['/node_modules/', '/test/e2e/'],
  testRegex: '(/test/.*|\\.(test|spec))\\.(ts|tsx|js)$',
  moduleFileExtensions: ['ts', 'tsx', 'js'],
};
