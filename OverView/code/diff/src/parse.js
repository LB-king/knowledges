import parseToObj from './parseToObj'
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
  // var tagStartReg = /^\<([a-z]+[1-6]?)\>/
  //添加了类名和id等attrs信息
  var tagStartReg = /^\<([a-z]+[1-6]?)(\s[^\<]+)?\>/
  var tagEndReg = /^\<\/([a-z]+[1-6]?)\>/
  //检测标签之间的文字,[^\<]:匹配任何不在指定范围内的任意字符
  var wordRegExp = /^([^\<]+)\<\/([a-z]+[1-6]?)\>/
  while (index <= template.length - 1) {
    rest = template.substring(index)
    //判断是不是开始标签
    if (tagStartReg.test(rest)) {
      var tag = rest.match(tagStartReg)[1]
      var attrs = rest.match(tagStartReg)[2]
      var attrsArr = parseToObj(attrs)
      console.log('遇到开始标签', tag)
      //1.将开始标记推入到栈1
      stack1.push(tag)
      //2.将一个[]推入栈2
      stack2.push({ tag, attrs: attrsArr, children: [] })
      //+2是包含了<>
      index += tag.length + 2 + (attrs? attrs.length : 0)
    } else if (tagEndReg.test(rest)) {
      //判断是不是结束标签
      var tag = rest.match(tagEndReg)[1]
      // console.log('遇到结束标签', tag)
      //1.栈1栈顶弹出
      var pop_tag = stack1.pop()
      // 此时tag一定是栈1栈顶的tag
      if (tag === pop_tag) {
        if (stack2.length > 1) {
          //2.栈2栈顶弹出,3.并且和前一项的children合并
          var pop_arr = stack2.pop()
          //注意最后一项不要弹出
          if (stack2.length > 0) {
            stack2[stack2.length - 1].children.push(pop_arr)
          }
        }
      } else {
        throw new Error(`${stack1[stack1.length - 1]}没有封闭`)
      }
      //+3表示</>
      index += tag.length + 3
    } else if (wordRegExp.test(rest)) {
      //判断标签中的文字
      var word = rest.match(wordRegExp)[1]
      if (!/^\s+$/.test(word)) {
        // console.log(`检测到了文字:${word}`)
        //改变栈2栈顶
        stack2[stack2.length - 1].children.push({ text: word, type: 3 })
      }
      index += word.length
    } else {
      //自闭合标签暂时不考虑
      index++
    }
  }
  // console.log(stack1, stack2)
  return stack2[0]
}
