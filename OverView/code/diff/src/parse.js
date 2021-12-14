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
  while (index <= template.length - 1) {
    rest = template.substring(index)
    //判断是不是开始标签
    if (tagStartReg.test(rest)) {
      var tag = rest.match(tagStartReg)[1]
      console.log('遇到开始标签', tag)
      index++
    }else if(tagEndReg.test(rest)) {
      var tag = rest.match(tagEndReg)[1]
      console.log('遇到结束标签', tag)
      index++
    }
     else {
      index++
    }
  }
}
