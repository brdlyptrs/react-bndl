import { resolve } from 'path';

import webpack from 'webpack';

import { BUILD_DIR } from '@demo/config';
import { name, manifest } from './src/index.js';

const BUILD = process.env.BUILD === 'development' ? 'development' : 'production';

export default {
  mode: BUILD,

  entry: {
    [name]: ['react', 'react-dom/client', 'react-router-dom', '@bndl/lib']
  },

  target: ['web', 'es5'],

  output: {
    path: resolve(BUILD_DIR, 'assets'),
    filename: '[name].js',
    library: name
  },

  resolve: {
    extensions: ['.json', '.ts', '.tsx']
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
    new webpack.DllPlugin({
      name,
      path: manifest
    })
  ],
};