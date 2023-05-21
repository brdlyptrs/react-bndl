import path, { resolve } from 'path';
import { fileURLToPath } from 'url';

import { build } from 'esbuild';

import pkg from './package.json' assert { type: 'json' };

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIST = resolve(__dirname, '..', 'dist');
const SRC  = resolve(__dirname, 'src');

const BUILD = process.env.BUILD || 'development';

const shared = {
  bundle: true,
  entryPoints: [resolve(SRC, 'index.ts')],
  external: Object.keys(pkg.dependencies),
  logLevel: 'info',
  minify: true,
  sourcemap: BUILD === 'development',
};

build({
  ...shared,
  format: 'esm',
  outfile: resolve(DIST,'index.mjs'),
  treeShaking: true
});

build({
  ...shared,
  format: 'cjs',
  outfile: resolve(DIST,'index.cjs'),
  treeShaking: true
});