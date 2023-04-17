const http = require('http')
const server = http.createServer((req, res) => {
  let urlStr = req.url,
    resStr = ''
  if (urlStr === '/api/data') {
    resStr = 'get返回的数据'
  } else {
    resStr = '404 not found.'
  }
  res.writeHead(200, {
    'content-type': 'text/plain;charset=utf-8'
  })
  res.end(resStr)
})
server.listen('3000', () => {
  console.log('UI_LOG: localhost:3000')
})
