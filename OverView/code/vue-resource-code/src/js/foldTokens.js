/**
 * 折叠tokens，就是把#和/之间的内容折叠起来，这里用到了栈的思维，压栈出栈
 */
/**
 *
 * @param {*} tokens
 * @returns
 */
export default function foldTokens(tokens) {
  let res = []
  //定义一个栈，用来存储#的内容
  let stack = []
  //定义一个收集器,让他指向res目标结果
  let collector = res
  let i = 0
  while (i < tokens.length) {
    let token = tokens[i]
    switch (token[0]) {
      case '#':
        //入栈
        stack.push(token)
        //收集器收集token
        collector.push(token)
        //收集器改变指针的内存地址,指向token[2],并且开始收集下面的token
        collector = token[2] = []
        break
      case '/':
        //出栈
        stack.pop()
        //重新改变收集器的指向
        collector = stack.length > 0 ? stack[stack.length - 1][2] : res
        break
      default:
        collector.push(token)
    }
    i++
  }

  return res
}
