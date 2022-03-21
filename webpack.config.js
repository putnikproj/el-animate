const path = require('path');

module.exports = (env, argv) => {
  const isProd = argv.mode === 'production';

  return {
    entry: './src/index.js',
    devtool: isProd ? false : 'eval-cheap-module-source-map',
    output: {
      path: path.resolve(__dirname, './public'),
      filename: 'js/[name].bundle.js',
      publicPath: '/',
    },
    target: isProd ? 'browserslist' : 'web',
    devServer: {
      contentBase: path.resolve(__dirname, 'public'),
      watchContentBase: true,
      compress: true,
      // hot: !isProd,
      overlay: !isProd,
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
      ],
    },
  };
};
