const http = require('http')
const mime = require('mime')
const path = require('path')
const fs = require('fs')
http
  .createServer((req, res) => {
    let urlStr = path.join(__dirname, req.url)
    let isExists = fs.existsSync(urlStr)
    console.log('UI_LOG: ', isExists)
    let data = ''
    console.log('UI_LOG: ', urlStr)
    //判断文件存不存在
    if (isExists) {
      console.log('UI_LOG: ', 'ok')
      let content = fs.readFileSync(urlStr)
      data = content.toString()
    } else {
      data = '404 NOT FOUND.'
    }
    res.end(data)
  })
  .listen(3000, () => {
    console.log('UI_LOG: ', 'localhost:3000...')
  })
