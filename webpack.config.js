const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const CaseSensitivePathsWebpackPlugin = require('case-sensitive-paths-webpack-plugin')

module.exports = {
  entry: path.join(__dirname, 'app', 'index.js'),
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].build.js',
    clean: true,
  },
  stats: 'errors-only',
  mode: process.env.NODE_ENV || 'development',
  optimization: {
    runtimeChunk: 'single',
  },
  resolve: {
    alias: {},
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
  },
  devServer: {
    contentBase: path.join(__dirname, '/app'),

    overlay: true,
    port: 7001,
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
        test: /\.(s?scss)$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
        use: ['file-loader'],
      },
    ],
  },

  plugins: [
    new HtmlWebPackPlugin({
      template: path.join(__dirname, 'base', 'index.html'),
    }),
    new CaseSensitivePathsWebpackPlugin(),
  ],

  devtool: 'cheap-module-source-map', // 'eval' is not supported by error-overlay-webpack-plugin
}
