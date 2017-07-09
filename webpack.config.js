const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    hello: './src/components/Hello.jsx',
    styling: './src/styling',
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'js/[name].js',
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /(node_modules|postgres-data)/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader'],
        }),
      },
      {
        test: /\.(woff|woff2|eot|ttf)$/,
        use: {
          loader: 'url-loader?limit=10000&name=fonts/[name].[ext]',
        },
      },
      {
        test: /\.(png|jpg|svg)$/,
        use: {
          loader: 'url-loader?limit=10000&name=img/[name].[ext]',
        },
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin({
      filename: 'css/[name].css',
    }),
  ],
  devServer: {
    publicPath: '/assets/',
    hot: true,
    compress: true,
    port: 8082,
  },
};
