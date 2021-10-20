#!/usr/bin/env node
//读取模板文件
const fs = require('fs')
const path = require('path')
const inquirer = require('inquirer')
const ejs = require('ejs')

inquirer.prompt([
  {
    type: 'input',
    name: 'name',
    message: 'enter your project-name'
  }
]).then(res => {
  //模板路径
  const tmpDir = path.join(__dirname, 'templates')
  //目标文件夹
  const destDir = process.cwd()
  //读取文件夹文件
  fs.readdir(tmpDir, (err, files) => {
    if(err) throw err

    files.forEach(file => {
      ejs.renderFile(path.join(tmpDir, file), res, (error, result) => {
        if(error) throw error
        fs.writeFileSync(path.join(destDir, file), result)
      })
    })
  })

})