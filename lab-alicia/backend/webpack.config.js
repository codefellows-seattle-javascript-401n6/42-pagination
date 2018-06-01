const HtmlPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: `${__dirname}/src/app.js`,
  plugins: [new HtmlPlugin({template: __dirname + '/public/index.html'})],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(scss|css)$/,
        loader: ['style-loader', 'css-loader' ,'sass-loader'],
      },
    ]
  }
};