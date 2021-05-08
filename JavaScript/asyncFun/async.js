const fs = require('fs')
let readFile = function (filename) {
  return new Promise(function (resolve, reject) {
    fs.readFile(filename, function (err, data) {
      if (err) reject(err)
      resolve(data)
    })
  })
}

var gen = function* () {
  console.log(4)
  var f1 = yield readFile('./push.html')
  console.log(f1)

}
