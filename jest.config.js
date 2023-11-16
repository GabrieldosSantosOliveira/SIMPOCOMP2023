/* eslint-disable @typescript-eslint/no-var-requires */
const { pathsToModuleNameMapper } = require('ts-jest')

const { compilerOptions } = require('./tsconfig.json')
/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['**/src/**/*.ts'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/',
  }),
}
