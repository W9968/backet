const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin')
const CaseSensitivePathsWebpackPlugin = require('case-sensitive-paths-webpack-plugin')

module.exports = {
  entry: path.join(__dirname, 'app', 'index.js'),
  output: {
    path: path.resolve(__dirname, './build'),
    filename: '[name].build.js',
    clean: true,
  },
  stats: 'errors-only',
  mode: process.env.NODE_ENV || 'development',
  optimization: {
    runtimeChunk: 'single',
  },
  resolve: {
    alias: {
      _module: path.resolve(__dirname, 'app/'),
      _styles: path.resolve(__dirname, 'app/styles/'),
    },
    modules: [path.resolve(__dirname, 'app'), 'node_modules'],
    extensions: ['.json', '.js', 'jsx', 'tsx', 'ts', '...'],
  },
  devServer: {
    contentBase: path.join(__dirname, './build'),
    historyApiFallback: true,
    publicPath: '/',
    compress: true,
    progress: true,
    overlay: {
      errors: true,
      warnings: false,
    },
    open: true,
    port: 7000,
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(css|scss)$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
        use: ['file-loader'],
      },
    ],
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebPackPlugin({
      template: path.join(__dirname, 'base', 'index.html'),
    }),
    new ErrorOverlayPlugin(),
    new CaseSensitivePathsWebpackPlugin(),
  ],

  devtool: 'cheap-module-source-map', // 'eval' is not supported by error-overlay-webpack-plugin
}
