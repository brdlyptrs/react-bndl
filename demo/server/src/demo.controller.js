import { createReadStream } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

import mime from 'mime-types';

import { BUILD_DIR } from '@demo/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export function view(ctx) {
  const path = resolve(BUILD_DIR, './index.html');

  ctx.type = 'text/html';
  ctx.body = createReadStream(path);
  ctx.status = 200;
}

export function app(ctx) {
  const path = resolve(BUILD_DIR, './app.js');

  ctx.type = 'application/javascript';
  ctx.body = createReadStream(path);
  ctx.status = 200;
}

export function asset(ctx) {
  const { file } = ctx.params;
  const path = resolve(BUILD_DIR, 'assets', file);

  ctx.type = mime.lookup(path);
  ctx.body = createReadStream(path);
  ctx.status = 200;
}