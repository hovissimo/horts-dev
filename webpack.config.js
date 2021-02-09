const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

const isDevelopment = process.env.NODE_ENV !== 'production'

const makeConfig = () => {
  const config = {
    entry: {
      app: './src/index.js',
    },
    module: {
      rules: [
        { // babel
          test: /\.m?js$/,
          exclude: /(node_modules)/,
          use: [
            'babel-loader'
          ],
        },
        { // styles
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader',
          ],
        },
        { // images
          // TODO: Look into image optimziation with url-loader and/or image-webpack-loader
          test: /\.(png|svg|jpg|gif)$/,
          use: [
            'file-loader',
          ],
        },
      ],
    },
    mode: isDevelopment ? "development" : "production",
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        title: 'Output Management',
      }),
      isDevelopment && new ReactRefreshWebpackPlugin(),
    ].filter(Boolean),
  }

  if (isDevelopment) {
    config.devServer = {
      contentBase: './dist',
      historyApiFallback: true,
    }
    config.devtool = 'inline-source-map'
    config.plugins.push(new ReactRefreshWebpackPlugin())
  }

  return config;
};

module.exports = makeConfig()

