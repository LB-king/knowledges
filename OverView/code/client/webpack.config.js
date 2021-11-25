const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'production',
  devServer: {
    port: 9080,
    hot: true,
    proxy: {
      '/': {
        target: 'http://127.0.0.1:5000',
        changeOrigin: true
      }
    }
  },
  entry:'./src/index.js',
  devtool: 'source-map',
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
