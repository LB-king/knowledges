const http = require('http')
const https = require('https')
const cheerio = require('cheerio')
function parseHtml(htmlData) {
  let res = ''
  const $ = cheerio.load(htmlData)
  const lis = $('li')
  //jQuery语法，爬取到的html片段可以处理成自己需要的格式。。。
  lis.each((i, el) => {
    res += $(el).text() + (i + 1 < lis.length ? '---' : '')
  })
  return res
}

const server = http.createServer((req, res) => {
  const resStr = `<ul id="fruits">
    <li class="apple">Apple</li>
    <li class="orange">Orange</li>
    <li class="pear">Pear</li>
  </ul>`
  res.writeHead(200, {
    'content-type': 'text/plain;charset=utf-8'
  })
  res.end(parseHtml(resStr))
  // https.get('https://www.meizu.com/', result => {
  //   result.on('data', chunk => {
  //     resStr += chunk.toString()
  //   })
  //   result.on('end', () => {
  //     res.end(parseHtml(resStr))
  //   })
  // })
})``
server.listen('3000', () => {
  console.log('UI_LOG: localhost:3000')
})
