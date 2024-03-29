import babel from 'rollup-plugin-babel'
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'
export default {
  input: './src/index.js',
  output: {
    file: 'dist/myMustache/mustache.js',
    name: 'Mustache',
    format: 'umd',
    sourcemap: true
  },
  plugins: [
    babel({
      exclude: 'node_modules/**'
    }),
    process.env.ENV === 'development'
      ? serve({
          open: true,
          openPage: '/public/index.html', //默认打开html的路径
          port: 3000,
          contentBase: ''
        })
      : null,
    livereload()
  ]
}