const http = require('http')
const server = http.createServer((request, response) => {
  console.log('UI_LOG: ', request.url)
  response.write(request.url)
  response.end()
})
server.listen(8090, 'localhost', () => {
  console.log('UI_LOG: ', 'localhost: 8090')
})
