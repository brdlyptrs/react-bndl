import { expect } from '@jest/globals';
import { TestingLibraryMatchers } from '@testing-library/jest-dom/matchers';


/**
 * Required for PNPM and React Testing Library
 * See issue: https://github.com/testing-library/jest-dom/issues/123
 */
declare module 'expect' {
  interface Matchers<R = void>
    extends TestingLibraryMatchers<typeof expect.stringContaining, R> { any }
}