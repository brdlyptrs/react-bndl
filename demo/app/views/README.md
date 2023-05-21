# Application: Views
Generated bundles per each view created, in this case the Home and About pages are packaged and deployed independently. The [main](../main) package will import these bundles based on the correlated route.


#### Installation
> pnpm add @app/views


#### Scripts
- `build` : Build bundle using Webpack
- `fix:fix`: Fix any possible lint errors and / or warnings
- `test:lint`: Check lint
- `test:types`: Check types