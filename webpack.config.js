const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    javascript: './src/components/Hello.jsx',
  },
  output: {
    path: path.join(__dirname, 'dist', 'js'),
    filename: 'bundle.js',
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
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    publicPath: '/assets/',
    hot: true,
    compress: true,
    port: 8082,
  },
};
