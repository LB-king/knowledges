//基于promise封装ajax
const qs = require('qs')
function ajax(options = {}) {
  var defaultOptions = {
    url: '',
    method: 'get',
    data: null,
    success: null
  }
  options = Object.assign(defaultOptions, options)
  // a=xxx&b=yyy  x-www-urlencoded格式
  // 写一个方法将对象转成上面的格式,针对get请求处理参数形式,也可以引入qs，使用其中的stringify 方法，和parse方法
  var { url, method, data } = options
  //判断是不是get请求
  data = qs.stringify(data)
  let isGet = /^(GET|HEAD|DELETE|OPTIONS)$/i.test(method)
  if (isGet && Object.keys(data).length > 0) {
    //判断是否已经有？
    url += `${url.includes('?') ? '&' : '?'}${data}`
    data = null
  }
  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest()
    xhr.open(method, url)
    xhr.onreadystatechange = function (r) {
      if (!/^2\d{2}$/.test(xhr.status)) {
        reject(xhr)
        return
      }
      if (xhr.readyState === 4) {
        resolve(JSON.parse(xhr.responseText))
      }
    }
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    xhr.send(data)
  })
}
;['get', 'post', 'put', 'options', 'delete', 'head'].forEach((item) => {
  ajax[item] = function (url = '', data = {}) {
    return ajax({
      url,
      data,
      method: item
    })
  }
})
export default ajax
