import axios from '../lib/axios'
//模拟串行ajax
!(function () {
  function F11() {
    return axios.get('/users')
  }
  function F22() {
    return axios.get('/users/u1')
  }
  function F33() {
    return axios.get('/users/u2')
  }
  btn6.addEventListener('click', async () => {
    let res = await F11()
    console.log(111, res)
    res = await F22()
    console.log(222, res)
    res = await F33()
    console.log(333, res)
  })
})()
