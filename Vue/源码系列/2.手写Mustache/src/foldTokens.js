/**
 * 将#和/之间的tokens整合起来,作为下标为4的项
 * @param {*} tokens
 * @returns
 */
export const foldTokens = tokens => {
  //结果数组
  let nestedTokens = []
  //栈结构，存放小tokens
  let sections = []
  //收集器,默认直接指向目标数组
  let collector = nestedTokens
  let i = 0
  while (i < tokens.length) {
    let token = tokens[i]
    switch (token[0]) {
      case '#':
        //收集器中放入这个token
        collector.push(token)
        //入栈
        sections.push(token)
        //收集器换指向了,按照引用类型的特性，collector和token[4]是同一个地址
        collector = token[4] = []
        break
      case '/':
        // 出栈
        sections.pop()
        // 改变收集器为栈结构队尾（栈顶）那项下标是4的数组
        collector =
          sections.length > 0 ? sections[sections.length - 1][4] : nestedTokens
        break
      default:
        //默认情况就一直往收集器。他会指向结果数组，也会指向某个token下标为4的数组
        collector.push(token)
    }
    i++
  }
  //栈的数据结构有LIFO特性。即后进先出
  //遇到#入栈
  //遇到/出栈
  return nestedTokens
}
