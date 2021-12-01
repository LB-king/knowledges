/* 
  数组去重
*/
// 1.利用[].indexOf()
function unique(arr) {
  let res = []
  for (let i = 0; i < arr.length; i++) {
    const element = arr[i]
    if (res.indexOf(element) === -1) {
      res.push(element)
    }
  }
  return res
}
//2.利用forEach + 对象的属性唯一性
function unique2(arr) {
  let obj = {},
    res = []
  arr.forEach((item) => {
    if (!obj.hasOwnProperty(item)) {
      obj[item] = 1
      res.push(item)
    }
  })
  return res
  // return Object.keys(obj) 这种写法会把数字转成字符串
}
//3.ES6 set
function unique3(arr) {
  return [...new Set(arr)]
}
