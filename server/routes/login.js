var express = require('express')
var router = express.Router()
var users = require('../data/users.json')
// console.log(users)
/* GET login listing. */
router.post('/', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", '*');
  let body = req.body
  Login(body, res)
})

//登陆方法
function Login({ name, password }, response) {
  let res = {}
  let user = users.find((item) => item.name === name)
  if (name === user.name && password === user.password) {
    res = {
      code: 1,
      msg: 'login success',
      data: {
        name,
        token: ''
      }
    }
  } else {
    res = {
      code: 1001,
      msg: '用户名或密码错误',
      data: null
    }
  }
  response.send(res)
}
module.exports = router
