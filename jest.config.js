module.exports = {
  collectCoverageFrom: [
    "**/*.{js,jsx,ts,tsx}",
    "!**/*.d.ts",
    "!**/node_modules/**"
  ],
  setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
  testPathIgnorePatterns: ["/node_modules/", "/.next/"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
    "^.+\\.css$": "<rootDir>/config/jest/cssTransform.js"
  },
  transformIgnorePatterns: [
    "/node_modules/",
    "^.+\\.module\\.(css|sass|scss)$"
  ],
  moduleNameMapper: {
    "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy"
  },
  collectCoverage: true,
  collectCoverageFrom: [
    "**/*.{ts,tsx}",
    "app/components/**/*.{tsx}",
    "app/pages/**/*.{tsx}",
    "!**/node_modules/**",
    "!**/index.tsx",
    "!config/",
    "!coverage/",
    "!lib/",
    "!reportReader.js",
    "!setupTests.js",
    "!**/next-env-d.ts",
    "!next.config.js"
  ],
  coverageDirectory: "coverage/",
  coverageReporters: ["text", "json"]
};
