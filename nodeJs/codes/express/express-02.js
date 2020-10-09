const express = require('express')
const bodyParser = require('body-parser')
const app = express()
// app.use('/public', express.static('public'))
app.get('/index.html', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})
app.get('/process_get', function(req, res) {
  let fullNmae = {
    first_name: req.query.first_name,
    last_name: req.query.last_name
  }
  res.writeHead(200, { 'Content-Type': 'text/plain;charset=utf-8' })
  res.end(JSON.stringify(fullNmae))
})
app.post(
  '/process_post',
  bodyParser.urlencoded({ extended: false }),
  (req, res) => {
    let fullNmae = {
      first_name: req.body.first_name,
      last_name: req.body.last_name
    }
    res.writeHead(200, { 'Content-Type': 'text/plain;charset=utf-8' })
    res.end(JSON.stringify(fullNmae))
  }
)
app.listen(3000, () => {
  console.log('running at:' + 3000)
})
