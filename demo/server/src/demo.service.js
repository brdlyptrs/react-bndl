import koa from 'koa';
import router from '@koa/router';

import { views } from './demo.routes.js';

const service = new koa();
const demo = new router();

demo.use(
  views.routes(),
  views.allowedMethods()
);

service
  .use(demo.routes())
  .use(demo.allowedMethods());

service.on('error', (err, ctx) => {
  console.log('server error', err, ctx)
});

export {
    service
}