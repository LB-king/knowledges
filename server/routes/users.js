var express = require('express')
var fs = require('fs')
var path = require('path')
var router = express.Router()

/* GET users listing. */
router.get('/', function (req, res, next) {
  console.log('收到一次请求', req.get('Host'))
  var data = fs
    .readFileSync(path.join(__dirname, '../data/users.json'))
    .toString()
  // let data = [
  //   { id: '001', name: 'H5' },
  //   { id: '002', name: 'Andriod' },
  //   { id: '003', name: 'IOS' }
  // ]
  res.header('Access-Control-Allow-Origin', '*')
  res.send(data)
})
router.get('/u1', function (req, res, next) {
  let data = [{ id: 'U1', name: 'U1' }]
  res.send(data)
})
router.get('/u2', function (req, res, next) {
  let data = [{ id: 'U2', name: 'U2' }]
  res.send(data)
})
// post
router.post('/', function (req, res, next) {
  let { id, name } = req.body
  // var data = fs.readFileSync(path.join(__dirname, '../data/users.json')).toString()
  let data = [
    { id: '001', name: 'H5' },
    { id: '002', name: 'Andriod' },
    { id: '003', name: 'IOS' },
    { id, name }
  ]
  res.send(data)
})

module.exports = router
