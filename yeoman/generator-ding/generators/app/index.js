const Generator = require('yeoman-generator')
const paths = [
  '.gitignore',
  'index.html',
  'package-lock.json',
  'package.json',
  'public\\favicon.ico',
  'src\\App.vue',
  'src\\assets\\logo.png',
  'src\\components\\HelloWorld.vue',
  'src\\index.css',
  'src\\main.js'

]
module.exports = class extends Generator {
  // 3.和命令行交互
  prompting() {
    //PROMISE
    return this.prompt([
      {
        type: 'input',
        name: 'title', //作为输入的键值
        message: 'Your project name: ',
        default: this.appname //默认文件夹的名字
      }
    ]).then((res) => {
      this.answers = res
    })
  }
  write() {
    // 1.生成src目录下的test.txt文件
    // this.fs.write(this.destinationPath('./src/test.txt'), Math.random().toString())
    // 2.以templates目录下的index.html为模板，生成index.html
    

    paths.forEach(file => {
      const templ = this.templatePath(file)
      const output = this.destinationPath(file)
      const context = this.answers
      this.fs.copyTpl(templ, output, context)
    })
  }
}
//读取某个文件夹的所有文件

// var fs = require('fs'),
//   path = require('path')
// function getfiles(dirPath, callback) {
//   fs.readdirSync(dirPath).forEach(function (name) {
//     var filePath = path.join(dirPath, name)
//     var stat = fs.statSync(filePath)
//     if (stat.isFile()) {
//       callback(filePath, stat)
//     } else if (stat.isDirectory()) {
//       getfiles(filePath, callback)
//     }
//   })
// }
// var templates = []
// getfiles(path.resolve('templates'), function (filePath, stat) {
//   // do something with "filePath"...
//   console.log(filePath.substr(filePath.lastIndexOf('templates') + 10))
//   templates.push(filePath.substr(filePath.lastIndexOf('templates') + 10))
// })
// console.log(templates)
//把arr的key都变成ok
/* var arr = [
  {
    key: 001,
    children: [
      {
        key: 002,
        children: [
          {
            key: 003,
            children: []
          }
        ]
      }
    ]
  }
]

function flatArr(arr = []) {
  // let r = []
  arr.forEach((item) => {
    item.key = 'ok'
    // r.push(item.key)
    if (item.children.length > 0) {
      flatArr(item.children)
    }
  })
  // return r 递归的结果并不会相加
  return arr
}

console.log(flatArr(arr)) */
