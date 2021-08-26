const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const CaseSensitivePathsWebpackPlugin = require('case-sensitive-paths-webpack-plugin')

module.exports = {
  entry: './app/_index.js',

  output: {
    path: path.join(__dirname, '/.bundle'),
    filename: '[name].[contenthash].js',
    clean: true,
  },

  optimization: {
    runtimeChunk: 'single',
  },

  resolve: {
    alias: {},
  },

  devServer: {
    contentBase: path.join(__dirname, '/.bundle'),
    compress: true,
    port: 7001,
    hot: true,
  },

  module: {
    rules: [
      {
        test: /\.js?x$/,
        exclude: /node_modules/,
        resolve: {
          extensions: ['.js', '.jsx'],
        },
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: {
          loader: 'file-loader',
        },
      },
      {
        test: /\.s?css$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },

  plugins: [
    new HtmlWebPackPlugin({
      title: 'Backet',
      template: './static/index.html',
    }),
    new CaseSensitivePathsWebpackPlugin(),
  ],

  devtool: 'cheap-module-source-map', // 'eval' is not supported by error-overlay-webpack-plugin
}
