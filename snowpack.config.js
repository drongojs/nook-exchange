const { dependencies } = require('./package.json');
const css = require('rollup-plugin-postcss');

module.exports = {
  webDependencies: [
    ...Object.keys(dependencies),
  ],
  installOptions: {
    // include: 'src/**/*.{ts,tsx}',
  },
  rollup: {
    plugins: [ css() ],
  },
  namedExports: {
  },
};
