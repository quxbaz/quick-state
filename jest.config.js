const path = require('path')

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  roots: ["test"],
  // collectCoverageFrom: ['src/*.{ts,tsx}'],
  // coverageDirectory: path.resolve(process.cwd(), 'coverage'),
}
