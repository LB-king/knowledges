export default function (template) {
  //去除模板字符串的首尾空格
  template = template.trim()
  //指针
  var index = 0
  //剩余部分
  var rest = ''
  //准备2个栈
  var stack1 = []
  var stack2 = []
  //检验开始标签和结束标签的正则
  var tagStartReg = /^\<([a-z]+[1-6]?)\>/
  var tagEndReg = /^\<\/([a-z]+[1-6]?)\>/
  //检测标签之间的文字
  var wordRegExp = /^([^\<]+)\<\/([a-z]+[1-6]?)\>/
  while (index <= template.length - 1) {
    rest = template.substring(index)
    //判断是不是开始标签
    if (tagStartReg.test(rest)) {
      var tag = rest.match(tagStartReg)[1]
      // console.log('遇到开始标签', tag)
      //将开始标记推入到栈1
      stack1.push(tag)
      //将一个[]推入栈2
      stack2.push([])
      //+2是包含了<>
      index += tag.length + 2
    } else if (tagEndReg.test(rest)) {
      //判断是不是结束标签
      var tag = rest.match(tagEndReg)[1]
      // console.log('遇到结束标签', tag)
      // 此时tag一定是栈1栈顶的tag
      if (tag === stack1[stack1.length - 1]) {
        stack1.pop()
      } else {
        throw new Error(`${stack1[stack1.length - 1]}没有封闭`)
      }
      //+3表示</>
      index += tag.length + 3
    } else if (wordRegExp.test(rest)) {
      var word = rest.match(wordRegExp)[1]
      console.log(`检测到了文字:${word}`)
      index++
    } else {
      //自闭合标签暂时不考虑
      index++
    }
  }
  console.log(stack1, stack2)
}
