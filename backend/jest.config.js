module.exports = {
  testEnvironment: 'node',
  setupFiles: ['<rootDir>/tests/loadTestEnv.js'],
  testPathIgnorePatterns: ['/node_modules/'],
  collectCoverageFrom: ['src/**/*.js', '!src/server.js'],
  coverageThreshold: {
    global: {
      statements: 75,
      branches: 60,
      functions: 75,
      lines: 75,
    },
  },
}
