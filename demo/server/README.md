## Demo: Server
A light weight asset and development server built with [Koa](https://koajs.com/), ran with [Nodemon](https://nodemon.io/) to restart if any changes occur/


#### Scripts
- `start` : Run server, restarts if any changes occur
- `lint:check`: Check lint
- `lint:fix`: Fix any possible lint errors and or warnings
- `type:check`: Check types

---

### Architecture
The code is broken into three pieces, the service itself, routes, and a controller for all request handling. The application is initialized in the [entry file](./src/index.js).

#### [Service](./src/demo.service.js)
Setup of routes, methods, and any other logic required for the demo.

#### [Routes](./src/demo.routes.js)
All routes used for the demo service.

- `/app.js`: Serving the demo application file
- `/assets/*`: Handle all assets for demo application
- `/hook`: Serve page used to demonstrate **useBundle** hook
- `/about`: Serve about page
- `/`: Serve home page

#### [Controller](./src/demo.controller.js)
All request handling logic can be found in this file, used in the [routes file](./src/demo.routes.js)