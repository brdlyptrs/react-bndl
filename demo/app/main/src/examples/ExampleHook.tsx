import React from 'react';
import { DynamicComponent, useBundle } from '@bndl/lib';

export const ExampleHook = () => {
  const { isLoading, data, error } = useBundle({
    path: './assets/components.js',
    name:'@app/components',
    component: 'Text'
  });

  return (
    <>
      {(isLoading && !data) ?
        <div>Loading</div> :
        (!isLoading && error) ?
          <div>{error.message}</div> :
          <DynamicComponent component={data}>
            Dynamic Component
          </DynamicComponent>
      }
    </>
  );
};