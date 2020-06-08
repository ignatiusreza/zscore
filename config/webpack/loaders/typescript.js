const PnpWebpackPlugin = require('pnp-webpack-plugin');

module.exports = (environment) =>
  environment.loaders.prepend('typescript', {
    test: /\.(ts|tsx)?(\.erb)?$/,
    use: [
      {
        loader: 'ts-loader',
        options: PnpWebpackPlugin.tsLoaderOptions(),
      },
    ],
  });
