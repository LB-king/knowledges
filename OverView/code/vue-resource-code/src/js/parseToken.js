/**
 * 把token和数据关联
 */
import renderTemplate from './renderTemplate'
import lookup from './lookup'
export default function parseToken(token, data) {
  var resStr = ''
  var arr = lookup(data, token[1])
  // console.log(arr)
  for (let i in arr) {
    resStr += renderTemplate(token[2], arr[i])
  }
  // console.log(resStr)
  return resStr
}
