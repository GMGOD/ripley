const webpack = require('webpack');
const slsw = require('serverless-webpack');
const path = require('path');

const enviroment = slsw.lib.serverless.service.provider.environment
module.exports = {
  mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
  entry: slsw.lib.entries,
  output: {
    libraryTarget: 'commonjs',
    filename: '[name].js',
    path: path.resolve(__dirname, 'build')
  },
  target: 'node',
  resolve: {
    extensions: ['*', '.js', '.ts', '.json']
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(enviroment)
    })
  ],
  externals: [],
  module: {
    rules: [
      {
        test: /\.js(x)?$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.ts(x)?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.mjs?$/,
        loader: 'javascript/auto',
        exclude: /node_modules/,
      }
    ],
  },
  optimization: {
    minimize: false,
  },
};