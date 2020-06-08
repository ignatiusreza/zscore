const setCamelCase = (loader) => {
  const cssLoader = loader.use.find((loader) => loader.loader === 'css-loader');

  cssLoader.options.camelCase = 'only';
};

module.exports = (environment) => {
  setCamelCase(environment.loaders.get('css'));
  setCamelCase(environment.loaders.get('moduleCss'));
};
