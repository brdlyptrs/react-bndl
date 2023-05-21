import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

import koa from 'koa';
import mount from 'koa-mount';

import { service } from './demo.service.js';

const port = process.env.DEV_SERVER_PORT || 8080;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = new koa();

app
  .use(mount('/', service))

const server = app.listen(port);

server.on('clientError', (e) => {
  console.warn('Port is already in use, cancelling...');
  server.close();
}).on('connect', () => {
  console.log(`App is now connected at port ${port}`);
});