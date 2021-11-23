export default function ajax(options = {}) {
  var defaultOptions = {
    url: '',
    method: 'get',
    data: null,
    success: null
  }
  options = Object.assign(defaultOptions, options)
  // a=xxx&b=yyy  x-www-urlencoded格式
  // 写一个方法将对象转成上面的格式,针对get请求处理参数形式
  var { url, method, data } = options
  var queryData = /^get$/i.test(method) ? toUrlEncoded(data) : data
  var xhr = new XMLHttpRequest()
  xhr.open(method, url)
  xhr.onreadystatechange = function (r) {
    if (/^2\d{2}$/.test(xhr.status) && xhr.readyState === 4) {
      typeof options.success === 'function' &&
        options.success(JSON.parse(xhr.responseText))
    }
  }
  xhr.send()
}

function toUrlEncoded(obj) {
  let arr = Object.entries(obj)
  if(!arr.length) return null
  if(1===arr.length) return `${arr[0]=arr[1]}`
  return Object.entries(obj).reduce((acc, cur) => {
    return acc[0] + '=' + acc[1] + '&' + cur[0] + '=' + cur[1]
  })
}
