import axios from 'axios'
import qs from 'qs'
// axios.defaults.baseURL = 'http://127.0.0.1:5000/'
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.transformRequest = (data) => qs.stringify(data)
axios.defaults.timeout = 0
//true的话后台必须配置Access-Control-Allow-Origin
axios.defaults.withCredentials = false

//请求拦截器
axios.interceptors.request.use((config) => {
  //带上token信息,暂时注释掉，真实项目自行打开
  let token = localStorage.getItem('token')
  token && (config.headers['token'] = token)
  return config
})

// 响应拦截器
axios.interceptors.response.use(
  (response) => {
    return response.data
  },
  (reason) => {
    //从服务器没有获取到数据(网络层面)
    let response = null
    if (reason) {
      // 服务器有响应，不过返回码是4/5开头的
      response = reason.response
      switch (response.status) {
        case 401:
          //未登录
          break
        case 403:
          //登录信息失效
          break
        case 404:
          //地址不存在
          break
        case 500:
          //服务器报错
          break
      }
    } else {
      if (!window.navigator.onLine) {
        console.log('网络连接断开，请重试~~~')
      }
    }
    return Promise.reject(response)
  }
)

export default axios
