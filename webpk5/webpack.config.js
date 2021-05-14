const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports = {
  mode: 'development',
  // entry: ['./src/index.js'],
  // entry: {
  //   main: ['./src/index.js', './src/a.js']
  // },
  // entry: {
  //   a: './src/a.js',
  //   b: './src/b.js'
  // },
  // // 特殊用法
  // entry: {
  //   one: ['./src/index.js', './src/a.js'],
  //   two: './src/b.js'
  // },
  entry: {
    public: './src/js/public.js',
    index: './src/js/index.js',
    home: './src/js/home.js',
    about: './src/js/about.js'
  },
  output: {
    // filename: '[name].js',
    filename: 'js/[name].[chunkhash:8].js', // 可以在文件名前加文件夹名称，配置chunkhash长度
    path: path.resolve(__dirname, 'dist')
  },
  // loader配置
  module: {
    rules: [
      // {loader: 'css-loader'}
      { test: /\.css$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'] }, //从右到左
      { test: /\.less$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'] },
      // { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] }
      { test: /\.scss$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'] }
    ]
  },
  // plugins插件配置
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/home.html', // 模板文件
      filename: 'html/home.html', // 打包后的文件名,可以在前面加上文件夹名称
      chunks: ['home', 'public'],
      minify: {
        collapseWhitespace: false, //是否去掉空格
        removeComments: true //移除注释
      }
    }),
    new HtmlWebpackPlugin({
      template: './src/about.html',
      filename: 'html/about.html',
      chunks: ['public', 'about']
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'html/index.html',
      chunks: ['public', 'index']
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    })
  ]
}

/* 
// 1、join是把各个path片段连接在一起， resolve把'/'当成根目录
console.log(path.join('/a', '/b')) // \a\b
console.log(path.resolve('/a', '/b')) // e:\b


// 2、join直接拼接字段，resolve解析路径并返回
console.log(path.join('a', 'b1', '..', 'b2')) // a\b2
console.log(path.resolve('a', 'b1', '..', 'b2')) // e:\codeSpace\a\b2

*/
