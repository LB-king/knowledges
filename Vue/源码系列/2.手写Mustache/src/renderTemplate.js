import { objectProperty } from "./objectProperty"
import { parseArray } from "./parseArray"
export const renderTemplate = (tokens, dataSource) => {
  let res = ''
  if (tokens.length > 0) {
    for (let i in tokens) {
      let token = tokens[i]
      //不带#
      if (token[0] === 'text') {
        res += token[1]
      } else if (token[0] === 'name') {
        //处理 'a.b.c'这种属性路径拼接的情况
        res += objectProperty(dataSource, token[1])
        //最难最难的就是有#的情况
      } else if (token[0] === '#') {
        //TODO
        res += parseArray(token, dataSource)
      }
    }
  }
  return res
}
