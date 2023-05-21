export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['/node_modules/'],
  coverageDirectory: './coverage',
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        diagnostics: false, // Jest should only test, let typescript validate types separately
      },
    ],
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts']
};