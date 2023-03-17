const url = require('url')
const log4js = require('log4js')
log4js.configure({
  appenders: { cheese: { type: 'file', filename: 'cheese.log' } },
  categories: { default: { appenders: ['cheese'], level: 'error' } }
})
var logger = log4js.getLogger('cheese')
logger.level = 'debug'
const urlStr = 'https://www.qq.com?name=kb&id=3333'
// logger.debug(url.parse(urlStr))
 var obj = {
  protocol: 'https:',
  slashes: true,
  auth: null,
  host: 'www.qq.com',
  port: null,
  hostname: 'www.qq.com',
  hash: null,
  search: '?name=kb&id=3333',
  query: 'name=kb&id=3333',
  pathname: '/',
  path: '/?name=kb&id=3333',
  href: 'https://www.qq.com/?name=kb&id=3333'
 }

 console.log('UI_LOG: ', url.format(obj))


 var resolveUrl = 'https://www.bbbb.com/a'
 console.log('UI_LOG: ', url.resolve(resolveUrl, '/b'))

var urlParam = new URLSearchParams(url.parse(urlStr).search)
console.log('UI_LOG: ', urlParam.get('id'))



