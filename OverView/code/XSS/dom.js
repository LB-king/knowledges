var a = document.getElementsByTagName('a')[0]
var queryObj = {}
var search = window.location.search

search = search
  .replace(/\?/, '')
  .split('&')
  .map((item) => item.split('='))

search.forEach((item) => {
  queryObj[item[0]] = item[1]
})

// search.replace(
//   /([^&=?]+)=([^&]+)/g,
//   (m, $1, $2) => (queryObj[$1] = decodeURIComponent($2))
// )
a.href = queryObj.redirectUrl

var script = document.createElement('script')
script.type = 'text/javascript'
script.async = true
script.src = 'remote.js'
var s = document.getElementsByTagName('script')[0]
s.parentNode.insertBefore(script, s)



document.write(queryObj.name)
window.eval(queryObj.name)
