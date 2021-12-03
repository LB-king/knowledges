const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'production',
  entry:'./src/index.js',
  devtool: 'source-map',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    port: 8888,
    hot: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './www/index.html',
      filename: 'index.html'
      // chunks: ['public', 'index']
    }),
  ]
}