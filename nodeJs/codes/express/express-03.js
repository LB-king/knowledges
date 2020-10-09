const express = require('express')
const bodyParser = require('body-parser')
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const app = express()
let dirName = 'tmp'
// app.use('/public', express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(multer({ dest: `/${dirName}/` }).array('image'))
app.get('/index.html', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})
app.post('/file_upload', (req, res) => {
  let exists = fs.existsSync(path.join(__dirname, dirName)) // 判断文件夹是否存在
  if (exists) {
    // 文件夹存在，则直接存入该文件夹
    fs.readFile(req.files[0].path, function(err, data) {
      if (err) throw err
      copyFile(req, res, data)
    })
  } else {
    // 文件夹不存在，则先创建
    fs.mkdir(path.join(__dirname, dirName), function(err) {
      if (err) throw err
      copyFile(req, res, data)
    })
  }
})
function copyFile(req, res, data) {
  let des_file = path.join(__dirname, dirName) + '/' + req.files[0].originalname
  fs.writeFile(des_file, data, function(err) {
    if (err) throw err
    res.writeHead(200, { 'Content-Type': 'text/plain;charset=utf8' })
    res.end(
      JSON.stringify({
        msg: 'success!',
        filename: req.files[0].originalname
      })
    )
  })
}
app.listen(3000, () => {
  console.log('running at:' + 3000)
})
