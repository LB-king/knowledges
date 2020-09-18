const http = require('http');
const url = require('url');

function start() {
  function onRequest(request, response) {
    console.log(request.url)
    response.writeHead(200, { 'Content-Type': 'text/plain;charset=utf8' });
    response.write('Hello World你好世界');
    response.end();
  }

  http.createServer(onRequest).listen(7777);
  console.log('Server has started.');
}
exports.start = start;