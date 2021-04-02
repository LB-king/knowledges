const path = require('path')
module.exports = {
  port: 8080,
  alias: {
    '/@/': path.resolve('src')
  }
}
