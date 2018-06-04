
'use strict';

const HtmlPlugin = require('html-webpack-plugin');

const config = {
  mode: 'development',
  devtool: 'source-map',
  entry: `${__dirname}/src/app.js`,
  output: {
    path: `${__dirname}/public`,
    filename: 'app.js'
  },
  plugins: [new HtmlPlugin({template: __dirname + '/public/index.html'})],
  module: {
    rules: [
      { test: /\.jsx?$/, loader: ['babel-loader'], exclude: /node_modules/
      },
      { test: /\.(scss|css)$/,
        loader: ['style-loader', 'css-loader', 'sass-loader']},
    ]
  }
};

module.exports = config;