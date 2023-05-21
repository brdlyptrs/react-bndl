## Demo
A small example to illustrate how to use [react-bndl](../lib/), also used for development and testing.

#### Installation
> pnpm add @bndl/demo

#### Scripts
- `start` : Runs the entire application, both the server and demo site in development mode
- `start:server`: Run only server
- `build:dev`: Build the site bundles for development
- `build:prod`: Build the site bundles for production
- `fix:lint`: Fix any lint issues that can be done automatically
- `test:lint`: Check lint for both server and site application
- `test:types`: Check types for both server and site application

---

### Structure
This examples is divided into several folders that segment the applications into various components. Each component is bundled individually and loaded via [react-bndl](../README.md) package within the main application code.

- [app](./app): Built with React, bundles with Webpack
- [server](./server): Demo server, uses [Koa](https://koajs.com/)