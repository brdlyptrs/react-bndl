## Lib
This folder contains all of the code for `bndl`, along with unit testing.

#### Installation
> pnpm add @bndl/lib

#### Scripts
- `build`: Build application for development or production distribution
- `fix:lint`: Fix any lint issues that can be done automatically
- `test:lint`: Check lint for both server and site application
- `test:types`: Check types for both server and site application
- `test:components`: Run unit tests

---

### Structure
The **lib** folder contains two pieces the [React Hook](./src/hook) and the [React Component](./src/component). There is also a custom error exported for reference, see [error](./src/error.ts).

#### Hook
The React Hook exported is `useBundle` it leverages `useCallback` to cache internal functions. A global variable is also used to cache all bundles loaded.

- `useBundle`: React hook to load and render a React Component from an independent Rect bundle
  - **Props**
    - `path`<String>: URL to bundle to load, can be relative or absolute
    - `name`<String>: Exported name of bundle that is loaded in the global scope
    - `component`<String>: Loads an exported component from the designated bundle, uses **default** if nothing is specified
  - **Returns**
    - `isLoading`<Boolean>: Indicates whether current hook loading
    - `data`<any>: Data used to create a React.Component with**React.createElement**
    - `error`<null|Error>: Any internal errors caught

#### Component
There are two components that are exported: **BundleComponent** and **DynamicComponent**.

- `BundleComponent`: Returns a React Component that utilizes **useBundle** under the hood.
  - **Props**
    - `path`<String>: URL to bundle to load, can be relative or absolute
    - `name`<String>: Exported name of bundle that is loaded in the global scope
    - `component`<String>: Loads an exported component from the designated bundle, uses **default** if nothing is specified
    - `onError`<Function>: Optional error callback if anything internal is caught
    - `LoaderComponent`<React.Component>: Optional custom component for loading state
- `DynamicComponent`: A wrapper around **React.createElement**.


#### Error
A customer Error class to help identify any issues, and use for testing.

- **Properties**
  - `message`<String>: Error message
  - `stack`<any>: Stack trace of where error occurred

### Build
[ESBuild](https://esbuild.github.io/) creates the distribution bundles that will be imported when downloading the package. There are two versions created: ESM and CommonJS, the **package.json** in the root of the repository outlines specifically these two exports.

See build configuration [here](./esbuild.bundle.js).

- **Environment Variables**
  - `BUILD`<development|production>: Determines what environment to build for, defaults to **development**

---

### Testing
For component and unit test, the [React](https://testing-library.com/docs/react-testing-library) version for [Testing Library](https://testing-library.com) is used. Tests are written in the folders associated with the components they are testing.