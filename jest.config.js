module.export = {
  roots: ["<rootDir>/__tests__"],
  transform: {
    "\\.(js|jsx)?$": "babel-jest"
  },
  testMatch: ["<rootDir>/__tests__/**/>(*.)test.{js, jsx}"], // finds test
  moduleFileExtensions: ["js", "jsx", "json", "node"],
  testPathIgnorePatterns: ["/node_modules/"],
  setupFilesAfterEnv: [
    // "@testing-library/react/cleanup-after-each",
    // "@testing-library/jest-dom/extend-expect"
    // setupFiles before the tests are ran
  ]
};
