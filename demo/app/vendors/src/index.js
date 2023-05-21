import { resolve } from 'path';

import { BUILD_DIR } from '@demo/config';

const name = 'vendors';
const bundle = resolve(BUILD_DIR, 'assets', `${name}.js`);
const manifest = resolve(BUILD_DIR, 'assets', `${name}-manifest.json`);


export {
  name,
  bundle,
  manifest,
};