import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

import webpack from 'webpack';

import { manifest } from '@app/vendors';
import { BUILD_DIR } from '@demo/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const BUILD = process.env.BUILD === 'development' ? 'development' : 'production';

export default {
  mode: BUILD,

  entry: {
    components: resolve(__dirname, 'src', 'index.ts')
  },

  output: {
    path: resolve(BUILD_DIR, 'assets'),
    filename: '[name].js',
    library: {
      type: 'umd',
      name: '@app/components',
      umdNamedDefine: true
    },
    globalObject: 'this'
  },

  resolve: {
    extensions: ['.js', '.json', '.ts', '.tsx']
  },

  module: {
    rules: [
      {
        test: /\.([jt]sx?)?$/,
        use: 'swc-loader',
        exclude: /node_modules/,
      }
    ],
  },

  plugins: [
    new webpack.DllReferencePlugin({
      manifest: manifest
    }),
  ]
};