import ajax from '../lib/ajax1'
import ajaxPromise from '../lib/ajax.promise'

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
