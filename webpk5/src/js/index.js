require('../font/iconfont.css')
require('../style/style.css')
require('../style/less.style.less')
require('../style/sass.style.scss')
require('./about')
// eslint-disable-next-line
console.log('index')
if (module.hot) {
  module.hot.accept('./about.js', function () {
    console.log('about.js改变了')
  })
}
