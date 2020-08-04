module.exports = {
  "displayName": "dius_tenis",
  "collectCoverage": true,
  "roots": [
    "<rootDir>/src"
  ],
  "testRegex": '(/__tests__/.*|(\\.|/)spec)\\.ts$',
  "transform": {
    "^.+\\.ts$": "ts-jest"
  },
  "collectCoverageFrom": [
    "**/*.ts"
  ],
  "coveragePathIgnorePatterns": [
    'src/index.ts',
    '/node_modules/',
  ],
  "coverageReporters": [
    "lcov",
    "text",
    "text-summary",
    "html"
  ],
  "coverageThreshold": {
    "global": {  // global thresholds
      "branches": 80,
      "functions": 80,
      "lines": 80,
      "statements": 80
    },
  },
  "moduleFileExtensions": [
    "ts",
    "js",
    "json",
    "node"
  ]
}