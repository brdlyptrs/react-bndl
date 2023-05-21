# Demo: Application
The purpose of this demo is to demonstrate creating a bundle for each view(home, about) along with a seperate bundle for individual components. Loading the view bundles via React Router, while components are imported via `useBundle` hook as required.

**Note**: A shared library bundle should be create that includes React, React Router, react-bndl and any other tool that may share context at the application level.

#### Installation
> pnpm add @demo/app


#### Scripts
- `start` : Alternative to **build:dev**
- `build:dev`: Build bundles in development mode, webpack will update on change
- `build:prd`: Export production bundle for all bundles in **demo/build**
- `fix:fix`: Fix any possible lint errors and / or warnings
- `test:lint`: Check lint
- `test:types`: Check types

#### Building
A custom build script is used to run all Webpack configurations in development mode in order for continuous updates to occur when changes are seen, see [here](./scripts/dev.build.js).

----

### Architecture
The application is broken down into several pieces: [main](#Main), [vendors](#Vendors), [components](#Components) and [views](#Views) where each is it own deployed bundle. As mentioned above, a vendors bundle is created for sharing packages common used in each bundle. The [DllPLugin](https://webpack.js.org/plugins/dll-plugin) is used to handle vendor bundle creation, and registering the vendor build with each bundle for dependency lookup.

#### Main
The entry bundle or main application execution context, ran on page load and will handle any other bundle required to load.

> [folder](./main) | [config](./main/webpack.config.js)


#### Vendor
Utilizing the [DllPLugin](https://webpack.js.org/plugins/dll-plugin) in-conjunction with Webpack, a vendor bundle will be generated along with a reference manifest of each dependency it contains. This manifest will be imported into other bundle Webpack configurations ([example](./main/webpack.config.js#L45)) in order to let them know where to reference certain packages. This bundle should should contain React at the very least, for the demo it contains React Router and react-bndl packages.

> [folder](./vendors) | [config](./vendors/webpack.config.js)

#### Components
A package for all interface elements, an independent bundle is created exporting various components that can be individually imported.

> [folder](./components) | [config](./components/webpack.config.js)

#### Views
The application pages, both bundled independently of each other.

> [folder](./views) | [config](./views/webpack.config.js)
