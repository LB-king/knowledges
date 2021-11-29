var a = document.getElementsByTagName('a')[0]
var queryObj = {}
var search = window.location.search
search.replace(
  /([^&=?]+)=([^&]+)/g,
  (m, $1, $2) => (queryObj[$1] = decodeURIComponent($2))
)
a.href = queryObj.redirectUrl

var script = document.createElement('script')
script.type = 'text/javascript'
script.async = true
script.src = 'remote.js'
var s = document.getElementsByTagName('script')[0]
s.parentNode.insertBefore(script, s)
