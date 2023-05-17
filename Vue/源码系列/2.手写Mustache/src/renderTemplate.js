export const renderTemplate = (tokens, dataSource) => {
  console.log('UI_LOG: ', tokens)
  let res = ''
  if (tokens.length > 0) {
    for (let i in tokens) {
      let token = tokens[i]
      console.log('UI_LOG: ', token)
      //不带#
      if (token[0] === 'text') {
        res += token[1]
      } else if (token[0] === 'name') {
        res += dataSource[token[1]]
        //最难最难的就是有#的情况
      } else if (token[0] === '#') {
        //TODO
      }
    }
  }
  return res
}
