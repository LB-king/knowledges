var querystring = require('querystring')
var obj = {
  name: '一段中文',
  id: '1'
}

let res = querystring.stringify(obj, null, null, {
  encodeURIComponent(string) {
    return querystring.unescape(string)
    //   return querystring.escape(string)
  }
})
console.log('UI_LOG: ', res)
