const isTest = process.env.NODE_ENV === 'test';

module.exports = {
  presets: [
    '@babel/preset-typescript',
    '@babel/preset-react',
    [
      '@babel/preset-env',
      {
        modules: isTest ? 'commonjs' : false,
        useBuiltIns: false, //isTest ? 'usage' : false,
        targets: {
          esmodules: true,
        },

      },
    ],
  ],
  plugins: [
    'babel-plugin-jsx-control-statements',
    [
      'babel-plugin-module-resolver',
      {
        extensions: [ '.js', '.ts', '.tsx' ],
        alias: {
          '^application/(.+)': './src/application/\\1',
          '^core/(.+)': './src/core/\\1',
          '^crosscutting/(.+)': './src/crosscutting/\\1',
          '^domain/(.+)': './src/domain/\\1',
          '^infrastructure/(.+)': './src/infrastructure/\\1',
          '^presentation/(.+)': './src/presentation/\\1',
        }
      },
    ],
    [
      'snowpack/assets/babel-plugin.js',
      {
        optionalExtensions: true,
      },
    ],
    [
      '@babel/plugin-proposal-class-properties',
      { loose: true },
    ],
    '@babel/plugin-transform-classes',
    [
      'jpex/babel-plugin',
      {
        identifier: [ 'jpex', 'ioc' ],
      },
    ],
  ],
  sourceMaps: isTest ? 'inline' : true,
};
