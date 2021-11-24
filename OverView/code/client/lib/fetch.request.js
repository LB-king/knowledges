import qs from 'qs'

const baseUrl = 'http://127.0.0.1:5000'

export default function http(url, options = {}) {
  url = baseUrl + url.replace(/^\b/, '/')
  let { params, method, type } = options
  /* 
    处理GET请求
  */
  !method ? (method = 'GET') : null
  if (params) {
    // 判断url是否存在问号?
    if (/^(GET|DELETE|OPTIONS|HEAD)$/i.test(method)) {
      let ask = url.includes('?') ? '&' : '?'
      url += `${ask}${qs.stringify(params)}`
    }
    delete options.params
  }

  /* 
    合并配置项
  */
  options = Object.assign(
    {
      //允许跨域携带资源凭证same-origin同源可以
      // credentials: 'include',
      //设置请求头
      headers: {}
    },
    options
  )

  options.headers.Accept = 'application/json'

  /* 
    token校验
  */
  const token = localStorage.getItem('token')
  token && (options.headers['token'] = token)

  /* 
    POST请求
  */

  if (/^(POST|PUT)$/i.test(method)) {
    !type ? (type = 'urlencoded') : null
    let cType

    if (type === 'urlencoded') {
      cType = 'x-www-form-urlencode'
      options.body = qs.stringify(options.body)
    }

    if (type === 'json') {
      cType = 'application/json'
      options.body = JSON.stringify(options.body)
    }
    options.headers['Content-Type'] = cType
  }

  return fetch(url, options)
    .then((response) => {
      if (!/^(2|3)\d{2}$/.test(response.status)) {
        switch (response.status) {
          case 401:
            break
          case 403:
            break
          case 404:
            break
        }
        return Promise.reject(response)
      }
      return response.json()
    })
    .catch((err) => {
      if (!window.navigator.onLine) {
        return console.log('offline')
      }
      return Promise.reject(err)
    })
}
