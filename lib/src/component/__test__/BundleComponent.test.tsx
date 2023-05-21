import React, { createElement } from 'react';

import { cleanup, render, waitFor } from '@testing-library/react';
import { afterEach, describe, it, jest, expect } from '@jest/globals';

import { fetchBundle } from '../../hook/fetch';
import { bundles } from '../../hook/hook';

import { BundleError } from '../../error';

jest.mock('../../hook/fetch');

const mockFetchBundle = fetchBundle as jest.MockedFunction<typeof fetchBundle>;

import { BundleComponent } from '../BundleComponent';

describe('BundleComponent', () => {
  const bundleName = '@example/foo';
  const bundlePath = './foo.js';

  afterEach(() => {
    delete globalThis[bundleName];
    bundles.clear();
    cleanup();
    jest.clearAllMocks();
  });

  it('should render default component from specified bundle', async () => {
    globalThis[bundleName] = {
      default: function Test() {
        return createElement('div', null, 'foo');
      }
    };

    const{ queryByText } = render(
      <BundleComponent path={bundlePath} name={bundleName} />
    );

    expect(queryByText('Loading ...')).toBeInTheDocument();
    await waitFor(() => {
      expect(queryByText('Loading ...')).not.toBeInTheDocument();
      expect(queryByText('foo')).toBeInTheDocument();
    });
  });

  it('should render component from specified bundle based on supplied component name', async () => {
    globalThis[bundleName] = {
      foo: function Test() {
        return createElement('div', null, 'foo');
      }
    };

    const{ queryByText } = render(
      <BundleComponent path={bundlePath} name={bundleName} component="foo"/>
    );

    await waitFor(() => {
      expect(queryByText('foo')).toBeInTheDocument();
    });
  });

  it('should render error message bundle was not found in global scope', async () => {
    mockFetchBundle.mockResolvedValueOnce(new Event('test'));

    const{ queryByText } = render(
      <BundleComponent path={bundlePath} name={bundleName} />
    );

    await waitFor(() => {
      expect(queryByText(/not found in global scope/i)).toBeInTheDocument();
    });
  });

  it('should render error message bundle does not export component', async () => {
    mockFetchBundle.mockResolvedValueOnce(new Event('test'));

    globalThis[bundleName] = {};

    const{ queryByText } = render(
      <BundleComponent path={bundlePath} name={bundleName} />
    );

    await waitFor(() => {
      expect(queryByText(/does not export a component/i)).toBeInTheDocument();
    });
  });

  it('should return error when passing onError prop', async () => {
    mockFetchBundle.mockResolvedValueOnce(new Event('test'));
    const mockOnError = jest.fn();

    globalThis[bundleName] = {};

    const { queryByText } = render(
      <BundleComponent
        path={bundlePath}
        name={bundleName}
        onError={mockOnError}
      />
    );

    await waitFor(() => {
      expect(queryByText(/does not export a component/i)).toBeInTheDocument();

      expect(mockOnError).toHaveBeenCalled();

      const result = mockOnError.mock.lastCall[0];
      expect(result).toBeInstanceOf(BundleError);
    });
  });

});