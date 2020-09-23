const http = require('http')
const url = require('url')
const util = require('util')

http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-type': 'text/plain;charset=utf-8' })
  console.log(req)
  // console.log(url.parse(req.url, true))
  // res.end(util.inspect(url.parse(req.url, true)))
  res.end(util.inspect(url.parse(req.url, true)))
}).listen(3000, function () {
  console.log('server at 3000')
})