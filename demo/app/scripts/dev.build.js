import webpack from 'webpack';
import { waitFile } from 'wait-file';

import AppWebpackConfig from '@app/main/webpack.config';
import LibsWebpackConfig from '@app/vendors/webpack.config';
import ComponentsWebpackConfig from '@app/components/webpack.config';
import ViewsWebpackConfig from '@app/views/webpack.config';

! async function() {

    /**
     * Build lib compiler first
     * Guarantees all bundles share same packages to prevent two states
     */
    const libCompiler = createCompiler(LibsWebpackConfig);
    libCompiler.watch(null, watchCallback('Libs'));

    /**
     * Manifest is needed for all other compilers to reference
     */
    const { path, library } = LibsWebpackConfig.output;
    const libPath = `${path}/${library}-manifest.json`;
    await waitFile({ resources: [libPath], delay:0 });

    /**
     * Create rest of compilers
     */
    const appCompiler = createCompiler([
        AppWebpackConfig,
        ComponentsWebpackConfig,
        ViewsWebpackConfig
    ]);

    appCompiler.watch(null, watchCallback('App'));
} ();


function createCompiler(config) {
  if (Array.isArray(config)) {
    const configs = config.map(config => ({
      ...config,
      devtool: 'inline-source-map',
      mode: 'development',
      stats: 'minimal'
    }));

    return webpack(configs);
  }

  return webpack({
    ...config,
    devtool: 'inline-source-map',
    mode: 'development',
    stats: 'minimal'
  });
}

function watchCallback(type) {
  return function(err, stats) {
    console.log(`Build ${type}`);

    if (err) {
      console.error(err.stack || err);
      if (err.details) {
        console.error(err.details);
      }
      return;
    }

    const info = stats.toJson();
    if (stats.hasErrors()) {
      console.error(info.errors);
    }
    if (stats.hasWarnings()) {
      console.warn(info.warnings);
    }
  }
}