import { renderHook, waitFor } from '@testing-library/react';
import { afterEach, afterAll, beforeAll, describe, it, jest, expect } from '@jest/globals';

import { BundleError } from '../../error';
import { fetchBundle } from '../fetch';
import { useBundle, bundles } from '../hook';

jest.mock('../fetch');

const mockFetchBundle = fetchBundle as jest.MockedFunction<typeof fetchBundle>;

describe('useBundle', () => {

  describe('isLoading', () => {
    const bundleName = '@example/foo';
    const bundlePath = './foo.js';
    const mockExport = jest.fn();

    beforeAll(() => {
      globalThis[bundleName] = {
        default: mockExport
      };
    });

    afterAll(() => {
      delete globalThis[bundleName];
      jest.clearAllMocks();
      bundles.clear();
    });

    it('should load bundle via fetchBundle', async () => {
      const { result } = renderHook(() =>
        useBundle({ path: bundlePath, name: bundleName })
      );

      expect(result.current).toEqual(expect.objectContaining({
        isLoading: true,
        error: null,
        data: null
      }));

      await waitFor(() => {
        expect(result.current).toEqual(expect.objectContaining({
          isLoading: false,
          error: null,
          data: mockExport
        }));

        expect(mockFetchBundle).toHaveBeenCalled();
      });
    });

    it('should use cached bundle instead of fetchBundle', async () => {
      const { result } = renderHook(() =>
        useBundle({ path: bundlePath, name: bundleName })
      );

      expect(result.current).toEqual(expect.objectContaining({
        isLoading: false,
        error: null,
        data: mockExport
      }));

      expect(mockFetchBundle).not.toHaveBeenCalledTimes(2);
    });
  });

  describe('data', () => {
    const bundleName = '@example/foo';
    const mockExport = jest.fn();

    afterEach(() => {
      delete globalThis[bundleName];
      bundles.clear();
    });

    afterAll(() => {
      jest.clearAllMocks();
    });

    it('should return default export for data if no component was specified', async () => {
      const bundleName = '@example/foo';
      const bundlePath = './foo.js';

      globalThis[bundleName] = {
        default: mockExport
      };

      const { result } = renderHook(() =>
        useBundle({ path: bundlePath, name: bundleName })
      );

      await waitFor(() => {
        expect(result.current).toEqual(expect.objectContaining({
          isLoading: false,
          error: null,
          data: mockExport
        }));

        expect(mockFetchBundle).toHaveBeenCalled();
      });
    });

    it('should return default export for data if no component was specified', async () => {
      const bundleName = '@example/foo';
      const bundlePath = './foo.js';
      const bundleExport = 'foo';

      globalThis[bundleName] = {
        [bundleExport]: mockExport
      };

      const { result } = renderHook(() =>
        useBundle({
          path: bundlePath,
          name: bundleName,
          component: bundleExport
        })
      );

      await waitFor(() => {
        expect(result.current).toEqual(expect.objectContaining({
          isLoading: false,
          error: null,
          data: mockExport
        }));

        expect(mockFetchBundle).toHaveBeenCalled();
      });
    });
  });

  describe('error', () => {

    afterEach(() => {
      jest.clearAllMocks();
    });

    afterAll(() => {
      bundles.clear();
    });

    it('should return error if bundle can not load', async () => {
      const bundleName = '@example/baz';
      const bundlePath = './baz.js';

      const mockError = new Error('Failed to load script');
      mockFetchBundle.mockRejectedValueOnce(mockError);

      const { result } = renderHook(() =>
        useBundle({ path: bundlePath, name: bundleName })
      );

      expect(result.current).toEqual(expect.objectContaining({
        isLoading: true,
        error: null,
        data: null
      }));

      await waitFor(() => {
        const { error } = result.current;

        expect(error).toBeInstanceOf(BundleError);
        expect(error.message).toEqual(expect.stringMatching(mockError.message));

        expect(mockFetchBundle).toHaveBeenCalledTimes(1);
      });
    });

    it('should return error if bundle does not export name in global scope', async () => {
      const bundleName = '@example/bar';
      const bundlePath = './bar.js';

      const expectedError = `Component ${bundleName} not found in global scope when fetching ${bundlePath}`;

      const { result } = renderHook(() =>
        useBundle({ path: bundlePath, name: bundleName })
      );

      expect(result.current).toEqual(expect.objectContaining({
        isLoading: true,
        error: null,
        data: null
      }));

      await waitFor(() => {
        const { error, isLoading } = result.current;

        expect(isLoading).toBeFalsy();

        expect(error).toBeInstanceOf(BundleError);
        expect(error.message).toEqual(expect.stringMatching(expectedError));

        expect(mockFetchBundle).toHaveBeenCalledTimes(1);
      });
    });

    it('should return error if no component is specified and default is not found', async () => {
      const bundleName = '@example/bat';
      const bundlePath = './bat.js';

      const expectedError = 'Bundle does not export a component';

      globalThis[bundleName] = {};

      const { result } = renderHook(() =>
        useBundle({ path: bundlePath, name: bundleName })
      );

      expect(result.current).toEqual(expect.objectContaining({
        isLoading: true,
        error: null,
        data: null
      }));

      await waitFor(() => {
        const { error, isLoading } = result.current;

        expect(isLoading).toBeFalsy();

        expect(error).toBeInstanceOf(BundleError);
        expect(error.message).toEqual(expect.stringMatching(expectedError));

        expect(mockFetchBundle).toHaveBeenCalledTimes(1);
      });
    });

    it('should return cached error if bundle already failed to load to prevent calling resource again', async () => {
      const bundleName = '@example/bat';
      const bundlePath = './bat.js';

      const expectedError = 'Bundle does not export a component';

      globalThis[bundleName] = {};

      const { result } = renderHook(() =>
        useBundle({ path: bundlePath, name: bundleName })
      );

      const { error, isLoading } = result.current;

      expect(isLoading).toBeFalsy();

      expect(error).toBeInstanceOf(BundleError);
      expect(error.message).toEqual(expect.stringMatching(expectedError));

      expect(mockFetchBundle).toHaveBeenCalledTimes(0);
    });
  });

});