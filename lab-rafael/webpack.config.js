const HtmlPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: `${__dirname}/src/index.jsx`,
  output: {
    path: `${__dirname}/dist`,
    filename: 'bundle-[hash].js'
  },
  plugins: [new HtmlPlugin({template: `${__dirname}/src/index.html`})],
  module: {
    rules: [
      { test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/},
      { test: /\.(css|scss)$/, loader: ['style-loader', 'css-loader', 'sass-loader']}
    ]
  }
};
