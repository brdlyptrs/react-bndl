import * as React from 'react';
import { fetchBundle } from './fetch';
import { BundleError } from '../error';
import { getComponent, getScope } from './utils';

interface IBundle {
  path: string
  name: string
  error: boolean
  data: any
}

interface IProps {
  path: string
  name: string
  component?: string | string[]
}

interface IStatus {
  isLoading: boolean
  error: null | Error
  data: any
}

export const bundles = new Map<string, IBundle>();

export function useBundle({ path, name, component }:IProps) {
  const bundleExists = bundles.get(name);
  const [status, setStatus] = React.useState<IStatus>({ isLoading: !bundleExists, error: null, data: null });

  const scope = getScope();

  const getBundle = React.useCallback(async () => {
    let error  = null;
    let data   = null;
    let bundle = bundles.get(name);

    try {
      if (bundle && bundle.error)
        throw bundle.error;

      if (!bundle) {
        setStatus({ ...status, isLoading: true  });
        await fetchBundle(path);

        if (!(name in scope))
          throw new BundleError({
            message: `Component ${name} not found in global scope when fetching ${path}`
          });

        bundle = { path, name, data: scope[name], error };
        bundles.set(name, bundle);
      }

      data = getComponent(bundle.data, component);
    } catch (e) {
      error = e instanceof BundleError ? e : new BundleError(e);
    } finally {

      if (!bundle)
        bundles.set(name, { path, name, data, error });

      setStatus({ isLoading: false, error, data });
    }
  }, [path, name, component]);

  React.useEffect(() => {
    getBundle();
  }, [path, name, component, getBundle]);

  return status;
}