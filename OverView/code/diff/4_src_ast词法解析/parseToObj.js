export default function (attrs) {
  //  class="box m1" id="main" -> [{name:'class', value:'box m1'}]
  if (!attrs) return []
  //去掉首尾的空格，便于处理
  attrs = attrs.trim()
  //是否在引号内
  var inQuotes = false
  //指针
  var index = 0
  //结果数组
  var result = []

  for (let i = 0, len = attrs.length; i < len; i++) {
    let char = attrs[i]
    // if(/\"/.test(char)) {
    if (char === '"') {
      inQuotes = !inQuotes
      // }else if(/\s/.test(char) && !inQuotes) {
    } else if (/ /.test(char) && !inQuotes) {
      //遇见空格，并且不在引号内
      console.log(i)
      var item = attrs.substring(index, i)
      result.push(item)
      index = i + 1
    }
  }
  result.push(attrs.substring(index))
  result= result.map((item) => {
    // var res = item.match(/(.+)="(.+)"/)
    var res = item.match(/^(.+)="(.+)"$/)
    if(res) {
      var [,name ,value] = res
      return {name, value}
    }
    
  })
  console.log(result)
  return result
}
