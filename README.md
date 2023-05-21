# `react-bndl`
A small package used to dynamically load React applications and / or components that are bundled independently. This package aims to fill a space where a user wants to control how their application is bundled and not be tied to any specific bundle tool.


### Why
For most, using React.lazyload in combination with split chunks will be the preferable choice or utilizing the package loadable. However these methods rely on the bundler to split code into chunks by parsing dynamic import statements placed by a user to designate where code should be split.

[react-bndl](#react-bndl) takes a different approach, allowing the user to create dedicated bundles using the compiling tools of their choice. Finally, bundles are loaded via the document script process, which allows for more complex management when it comes to splitting and loading application code.


## Getting Started
There are two main pieces to [react-bndl](#react-bndl), **BundleComponent** and **useBundle**. Each has their own use case, but most will probably use **BundleComponent**.

#### Package installation:
> npm install react-bndl


### Component
`BundleComponent` is a react component that will load deployed react bundles asynchronously, displaying a loading state until completed. A custom loader can be supplied via **LoaderComponent**. The component also has an onError callback in the event loading the bundle encounters an error internally.

- See more [here](./lib/README.md#Component)

**Example**: Component + Custom Loader
```jsx
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import { BundleComponent } from 'react-bndl';

function App() {

  return (
    <>
      <BundleComponent
        path="./assets/home.js"
        name="@app/home"
        LoaderComponent={
          <Box sx={{ display: 'flex' }}>
            <CircularProgress />
          </Box>
        }
        onError={
          (error) => console.log(error)
        }
      />
    <>
  )
}
```

**Example**: React Router
```jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { BundleComponent } from 'react-bndl';

export function App() {
  return (
    <Routes>
      <Route path="about"
        element={
          <BundleComponent
            path="./assets/about.js"
            name="@app/about"
          />
        }
      />
      <Route path="/"
        element={
          <BundleComponent
            path="./assets/home.js"
            name="@app/home"
          />
        }
      />
    </Routes>
  );
};
```

### Hook
The `useBundle` hook allows you to manage when each bundle is loaded, and the current state of loading them.

- See more [here](./lib/README.md#Hook)

**Example**: Hook & DynamicComponent
```jsx
import { DynamicComponent, useBundle } from 'react-bndl';

export function App() {
  const { isLoading, data, error } = useBundle({
    path: './assets/home.js',
    name:'@app/home'
  });

  useEffect(() => {
    if (error) {
      // Report error
    }

  }, [error]);

  return (
    <>
      {(isLoading && !data)?
        <div>Loading</div> :
        (!isLoading && error)?
          <div>{error.message}</div>:
          <DynamicComponent component={data}>
            Dynamic Component
          </DynamicComponent>
      }
    </>
  );
};
```


## Development
A demo application was created to mimic the use cases for this package, it imports the library source code by using pnpm workspaces. All information related to the demo can be found [here](./demo).

- Requires **NodeJS v18.16+** and **PNPM v8.0+**


#### Installation
Install all dependencies, create [vendors bundle](./demo/app/vendors) for [demo application](./demo/app)
> pnpm install

#### Start
Run [demo application](./demo/app) in development mode to test [react-bndl library](./lib)
> pnpm start


#### Scripts
- `start`: Starts development server and builds demo application in development mode
- `build:lib`: Create production distribution that exports a CommonJS and ESM version of the react-bndl library
- `build:app`: Create a production bundle of the demo application
- `fix:lint`: Attempt to fix any lint errors
- `test:lint`: Check lint in packages
- `test:types`: Type check packages
- `test:component`: Run Jest unit tests for lib/src
- `test:end-to-end`: Run Playwright tests that utilize the demo application to mock a real implementation
- `test:integration`: Run Playwright Component tests against the distribution of the react-bndl lib ESM file


### Testing
For all unit and component testing, the React version of [Testing Library](https://testing-library.com) is used. For end to end testing, and integration testing for the package distribution [Playwright](https://playwright.dev/docs/api/class-test) testing is leveraged. Playwright's experimental component testing is used as well, see more [here](https://playwright.dev/docs/test-components).