const path = require('path')
module.exports = {
  mode: 'none',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.md$/,
        use: ['html-loader', './markdown-loader.js']
      }
    ]
  }
}