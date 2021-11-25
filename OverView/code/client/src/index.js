import ajax from '../lib/ajax1'
import ajaxPromise from '../lib/ajax.promise'
import axios from '../lib/axios'
import request from '../lib/fetch.request'
import './serial'
import './parallel'
// 基于原生js
btn.addEventListener('click', () => {
  ajax({
    url: 'http://127.0.0.1:5000/users/u1',
    method: 'get',
    data: {
      name: 'zs',
      id: 123
    },
    success: function (res) {
      console.log(res)
    }
  })
})

function F1() {
  return ajaxPromise.get('http://127.0.0.1:5000/users')
}
function F2() {
  return ajaxPromise.get('http://127.0.0.1:5000/users/u1')
}
function F3() {
  return ajaxPromise.get('http://127.0.0.1:5000/users/u2')
}

//2.基于promise封装
async function handleClick() {
  let res = await F1()
  console.log('111', res)
  res = await F2()
  console.log('222', res)
  res = await F3()
  console.log('333', res)
  /*  F1()
    .then((res) => {
      console.log('111', res)
      return F2()
    })
    .then((res) => {
      console.log('222', res)
      return F3()
    })
    .then((res) => {
      console.log('333', res)
    })
    .catch((err) => {
      console.log(err)
    }) */
}
//ajax串行，会行成回调地狱
btn1.addEventListener('click', handleClick)

// 3.基于axios
async function handleClick1() {
  let res = await F11()
  console.log('111', res)
  res = await F22()
  console.log('222', res)
  res = await F33()
  console.log('333', res)
}
btn2.addEventListener('click', handleClick1)
function F11() {
  return axios.get('/users')
}
function F22() {
  return axios.get('/users/u1')
}
function F33() {
  return axios.get('/users/u2')
}

/* 
  4. 基于fetch，fetch是浏览器内置的函数，基于fetch可以向服务器发送请求，核心原理和ajax(XMLHtppRequest)不一致,天生基于promise管理的
    + 不论服务器返回的状态码是多少，都按照PROMISE成功来算，只有断网，才算失败
  */

btn3.addEventListener('click', handleFetch)
function handleFetch() {
  /* fetch('http://127.0.0.1:5000/users')
    .then((res) => {
      return res.json()
    })
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.log(err)
    }) */

  // fetch中的参数放在body中
  request('users', {
    method: 'post',
    body: qs.stringify({
      account: 'user',
      password: '123456'
    })
  }).then((res) => {
    console.log(res)
  })
}
window.fn = function (param) {
  console.log(param)
}
// 5.JSONP实现跨域
btn4.addEventListener('click', () => {
  var script = document.createElement('script')
  script.src = 'http://127.0.0.1:5000/users/jsonp?callback=fn'
  document.body.appendChild(script)
})

// 测试proxy
btn5.addEventListener('click', () => {
  fetch('/users')
    .then((res) => {
      return res.json()
    })
    .then((r) => {
      console.log(r)
    })
})
