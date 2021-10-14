const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
//引入clean插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
module.exports = {
  mode: 'production',
  //指定入口文件
  entry: './src/index.ts',
  //指定打包文件所在的目录
  output: {
    //指定打包文件的目录
    path: path.resolve(__dirname, 'dist'),
    //打包后文件的文件名
    filename: 'bundle.js',
    environment: {
      //告诉webpack不使用箭头函数
      arrowFunction: false
    }
  },
  module: {
    //指定要加载的规则
    rules: [
      {
        test: /\.ts$/,
        //要使用的loader
        use: [
          //配置babel
          // {
            //指定loader
            // loader: 'babel-loader',
            // options: {
            //   //设置预定义的环境
            //   presets: [
            //     //指定环境的插件
            //     '@babel/preset-env',
            //     //配置信息
            //     {
            //       targets: {
            //         'chrome': '58',
            //         'ie': 11
            //       },
            //       //指定corejs版本
            //       'corejs': '3',
            //       //使用corejs的方式usage按需加载
            //       'useBuitIns': 'usage'
            //     }
            //   ]
            // }
          // },
          'ts-loader'
        ],
        //要排除的文件
        exclude: /node_modules/
      }
    ]
  },
  // 配置webpack插件
  plugins: [
    new HTMLWebpackPlugin({
      // title: 'DIY-Title'
      template: './src/index.html'
    }),
    new CleanWebpackPlugin()
  ],
  //用来设置引用模块
  resolve: {
    extensions: ['.ts', '.js']
  }
}
