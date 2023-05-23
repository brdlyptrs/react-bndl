import * as React from 'react';

import { useBundle } from '../hook';
import { DynamicComponent } from './DynamicComponent';

interface ILoaderProps {
  children?: any
  [key:string]: any
}


interface IFallbackProps {
  error: Error
  children?: any
  [key:string]: any
}

interface IBundleProps {
    path: string
    name: string
    component?: string|string[]
    children?: any
    onError?: (error:Error) => void
  LoaderComponent?: React.ComponentType<ILoaderProps>
  FallbackComponent?: React.ComponentType<IFallbackProps>
}

export function BundleComponent({ path, name, component, children, LoaderComponent, FallbackComponent, onError, ...props }: IBundleProps) {
  const { isLoading, data, error } = useBundle({ path, name, component });

  const renderError = (error) => {
    onError && onError(error);

    if (FallbackComponent)
      return React.createElement(FallbackComponent, { error, ...props }, children);
    return <div>{(error && error.message) ?? 'Loadable was unable to render component'}</div>;
  };

  const renderLoader = () => {
    if (LoaderComponent)
      return React.createElement(LoaderComponent, { ...props }, children);
    return <div>Loading ...</div>;
  };

  if (isLoading && !data)
    return renderLoader();
  if (error || (!data && !isLoading))
    return renderError(error);
  else
    return (
      <DynamicComponent component={data} {...props} >
        {children}
      </DynamicComponent>
    );
}