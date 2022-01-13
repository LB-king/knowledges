import babel from 'rollup-plugin-babel'
import server from 'rollup-plugin-server'
console.log(process.env.ENV)
export default {
  input: './src/index.js', //以哪个文件作为打包的入口
  output: {
    file: 'dist/mvvm/Vue.js', //出口路径
    name: 'Vue', //指定打包后全局变量的名字
    format: 'umd', //统一模块规范
    sourcemap: true //打开源码的调试
  },
  plugins: [
    babel({
      exclude: 'node_modules/**'
    }),
    process.env.ENV === 'development'
      ? server({
          open: true,
          openPage: '/public/index.html', //默认打开html的路径
          port: 3000,
          contentBase: 'public'
        })
      : null
  ]
}
