const path = require('path');

const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: ['babel-polyfill', path.join(__dirname, '..', '/_src/index'),
  ],
  output: {
    path: __dirname,
    filename: './_dist/index.js',
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  watchOptions: {
    argregateTimeout: 100,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'babel-loader',
            query: {
              presets: ['env', 'stage-0'],
            },
          },
          'ts-loader',
        ],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      title: 'Page',
      template: path.join(__dirname, '..', '_src', 'index.html'),
      filename: path.join(__dirname, '..', '_dist', 'index.html'),
    }),
  ],
};
