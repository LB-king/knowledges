/**
 * 把tokens数组结合数据变成dom字符串
 */
import lookup from './lookup'
import parseToken from './parseToken'
export default function renderTemplate(tokens, data) {
  // console.log(tokens)
  let resStr = ''
  for (let i = 0, len = tokens.length; i < len; i++) {
    let token = tokens[i]
    if (token[0] === 'text') {
      resStr += token[1]
    } else if (token[0] === 'name') {
      resStr += lookup(data, token[1])
    } else if (token[0] === '#') {
      //#的处理,获取数组中循环的数组
      resStr += parseToken(token, data)
    }
  }
  return resStr
}
