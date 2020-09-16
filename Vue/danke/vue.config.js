module.exports = {
  lintOnSave: false,
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import '~@/styles/common.scss';`
      }
    }
  },
  chainWebpack: config => {
    config.module
      .rule('images')
      .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
      .use('url-loader')
      .loader("url-loader")
      .tap(options => Object.assign(options, { limit: 10240 }))
  }
}
