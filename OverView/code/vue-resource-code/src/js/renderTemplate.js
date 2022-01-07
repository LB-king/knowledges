/**
 * 把tokens数组结合数据变成dom字符串
 *
 *
 */
export default function renderTemplate(tokens, data) {
  console.log(tokens)
  let resStr = ''
  for (let i = 0, len = tokens.length; i < len; i++) {
    let token = tokens[i]
    if (token[0] === 'text') {
      resStr += token[1]
    } else if (token[0] === 'name') {
      resStr += getObjValue(data, token[1])
    }
  }
  return resStr
}

/**
 * 封装一个连续读取对象的方法
 * 如:obj={a:{b:{c:'c'}}}  str='a.b.c
 */
function getObjValue(obj, keysString) {
  var arr = keysString.split('.')
  while (arr.length > 0) {
    var key = arr.shift()
    obj = obj[key]
  }
  return obj
}
