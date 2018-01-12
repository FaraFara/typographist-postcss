const { join } = require('path');

const webpack = require('webpack');

const HappyPack = require('happypack');

const happyThreadPool = HappyPack.ThreadPool({ size: 5 });

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const AssetsPlugin = require('assets-webpack-plugin');

module.exports = {
  output: {
    path: join(__dirname, '..', 'dist', 'assets'),
    publicPath: '/assets/',
    filename: '[name].js',
    chunkFilename: '[id].js',
  },
  watch: false,
  devtool: false,
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new HappyPack({
      id: 'css',
      threadPool: happyThreadPool,
      loaders: [
        {
          loader: 'css-loader',
          options: {
            sourceMap: true,
          },
        },
        'resolve-url-loader',
      ],
    }),
    new HappyPack({
      id: 'scss',
      threadPool: happyThreadPool,
      loaders: [
        {
          loader: 'css-loader',
          options: {
            sourceMap: true,
          },
        },
        'resolve-url-loader',
        {
          loader: 'sass-loader',
          options: {
            sourceMap: true,
          },
        },
      ],
    }),
    new HappyPack({
      id: 'images',
      threadPool: happyThreadPool,
      loaders: [
        {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
          },
        },
        'image-webpack-loader',
      ],
    }),
    new ExtractTextPlugin('[name].css', {
      allChunks: true,
      disable: true,
    }),
    new AssetsPlugin({
      filename: 'assets.json',
      path: join(__dirname, '..', 'dist', 'assets'),
    }),
    new webpack.optimize.UglifyJsPlugin({
      // more info: http://lisperator.net/uglifyjs/compress
      compress: {
        sequences: true, // join consecutive statemets with the “comma operator”
        properties: true, // optimize property access: a["foo"] → a.foo
        dead_code: true, // discard unreachable code
        drop_debugger: true, // discard “debugger” statements
        unsafe: false, // some unsafe optimizations (see below)
        conditionals: true, // optimize if-s and conditional expressions
        comparisons: true, // optimize comparisons
        evaluate: true, // evaluate constant expressions
        booleans: true, // optimize boolean expressions
        loops: true, // optimize loops
        unused: true, // drop unused variables/functions
        hoist_funs: true, // hoist function declarations
        hoist_vars: false, // hoist variable declarations
        if_return: true, // optimize if-s followed by return/continue
        join_vars: true, // join var declarations
        cascade: true, // try to cascade `right` into `left` in sequences
        side_effects: true, // drop side-effect-free statements
        warnings: false, // warn about potentially dangerous optimizations/code
        global_defs: {
          __REACT_HOT_LOADER__: undefined, // eslint-disable-line no-undefined
        },
      },
      sourceMap: true,
      output: {
        comments: false,
      },
      // more options: https://github.com/webpack-contrib/uglifyjs-webpack-plugin
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['happypack/loader?id=css'],
        }),
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['happypack/loader?id=scss'],
        }),
      },
      {
        test: /\.(png|jpg|gif|svg|woff|woff2)$/,
        use: ['happypack/loader?id=images'],
      },
    ],
  },
};