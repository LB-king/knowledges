const http = require('http')
const url = require('url')
http.createServer(function(req, res) {
  // console.log(url.parse(req.url))
  res.setHeader('Content-type', 'text/plain;charset=utf-8')
  res.end('页面访问成功')
}).listen(3000, function() {
  console.log('running at 3000!')
})