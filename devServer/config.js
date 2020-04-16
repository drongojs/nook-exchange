const path = require('path');

const defaultConfig = {
  port: 8080,
  babelDir: '/lib',
  static: {
    '*': '.',
  },
  http2: false,
  extensions: [ '.js', '.ts', '.tsx' ],
  cookies: {},
  proxies: [],
  views: './src/presentation',
};

const userConfig = require(path.resolve('./devServer.config.js'));

module.exports = {
  ...defaultConfig,
  ...userConfig,
};
