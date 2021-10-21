const marked = require('marked')
module.exports = (source) => {
  const html = marked(source)
  //结果要转成js代码
  // const code = `module.exports=${JSON.stringify(html)}`
  // return code
  return html
}