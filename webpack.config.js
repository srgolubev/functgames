const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  // Entry point of the application
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    open: true,
    port: 9000,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|webp|gif|svg|mp4|webm)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
      inject: 'body',
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'content.json', to: '' },
        { from: 'assets', to: 'assets' },
        { from: 'assets/fonts', to: 'assets/fonts' }
      ]
    })
  ],
};