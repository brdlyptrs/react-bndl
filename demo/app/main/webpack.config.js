import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

import { manifest } from '@app/vendors';
import { BUILD_DIR } from '@demo/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const BUILD = process.env.BUILD === 'development' ? 'development' : 'production';

export default {
  mode: BUILD,

  entry: {
    app: resolve(__dirname, 'src', 'index.tsx'),
  },

  target: ['web', 'es5'],

  output: {
    path: BUILD_DIR,
    filename: 'app.js'
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
    new webpack.DllReferencePlugin({
      manifest: manifest
    }),
    new HtmlWebpackPlugin({
      template: resolve(__dirname, 'src', 'index.html'),
      inject: false
    })
  ],
};
