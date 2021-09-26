const proxy = require('http-proxy-middleware')

module.exports = function(app) {
  app.use(
    proxy('/api', {
      target: 'http://localhost:5000',
      changeOrigin: true,
      pathRewrite: {
        '/api': ''
      }
    }),
    proxy('/api2', {
      target: 'http://localhost:5001',
      changeOrigin: true,
      pathRewrite: {
        '/api2': ''
      }
    })
  )
}