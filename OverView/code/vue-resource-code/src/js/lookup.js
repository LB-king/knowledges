/**
 * 这个函数是实现连续调用'a.b.c'
 * obj = {a:{b:{c:88}}}  => lookup(obj, 'a.b.c') => 得到结果88
 */
export default function lookup(obj, keyNames) {
  //判断{{.}}.这种情况
  if (keyNames.trim() !== '.') {
    var names = keyNames.split('.')
    /*  for (let i = 0, len = names.length; i < len; i++) {
      obj = obj[names[i]]
    } */
    while (names.length > 0) {
      var key = names.shift()
      //去除空格
      obj = obj[key.trim()]
    }
  }

  // console.log(obj)
  return obj
}

// lookup({ a: { b: { c: 88 } } }, 'a.b.c')
