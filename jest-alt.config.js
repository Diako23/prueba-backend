module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  roots: ['<rootDir>/test'],
  moduleFileExtensions: ['ts', 'js', 'json'],
  transform: {
    '^.+\\.ts$': ['ts-jest', {
      tsconfig: {
        jsx: 'react',
      },
      isolatedModules: true,
    }],
  },
  collectCoverageFrom: ['src/**/*.ts', '!src/main.ts'],
  testMatch: ['**/test/**/*.spec.ts'],
  moduleNameMapper: {
    '^reflect-metadata$': '<rootDir>/node_modules/reflect-metadata',
  },
};
