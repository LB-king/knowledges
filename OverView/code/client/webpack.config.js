const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'production',
  devServer: {
    port: 9081,
    hot: true
  },
  entry:'./src/index.js',

  output: {
    filename: 'js/[name].[chunkhash:8].js', // 可以在文件名前加文件夹名称，配置chunkhash长度
    path: path.resolve(__dirname, 'dist')
  },

  // plugins插件配置
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    })
  ]
}
