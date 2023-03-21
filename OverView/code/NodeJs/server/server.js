const http = require('http')
const qs = require('querystring')
const server = http.createServer((request, response) => {
  // console.log('UI_LOG: ', request)
  let data = ''
  response.writeHead(200, {
    'content-type': 'application/json; charset=utf-8'
  })
  request.on('data', chunk => {
    console.log('UI_LOG: ', chunk.toString())
    data += chunk
  })
  request.on('end', () => {
    response.write(JSON.stringify(qs.parse(data)))
    response.end()
  })
})
server.listen(8090, 'localhost', () => {
  console.log('UI_LOG: ', 'localhost:8090')
})
