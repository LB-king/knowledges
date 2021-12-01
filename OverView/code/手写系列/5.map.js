/* 
  map()方法返回一个新的数组，其结果是该数组中的每个元素调用一次提供的函数后的返回
*/

//使用
// var arr = [11, 22, 33]
// var res = arr.map((item, index ) => {
// console.log(item, index )
// })
// console.log(res)

function myMap(arr, callback) {
  var res = []
  for (let i = 0; i < arr.length; i++) {
    res.push(callback(arr[i], i))
  }
  return res
}


