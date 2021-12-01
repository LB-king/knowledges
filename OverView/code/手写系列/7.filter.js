/* 
  filter() 过滤数组
*/

function myFilter(arr, callback) {
  let res = []
  for (let i = 0; i < arr.length; i++) {
    const element = arr[i]
    let flag = callback(element, i)
    if (flag) res.push(element)
  }
  return res
}

/* 
  find() 
*/
function myFind(arr, callback) {
  for (let i = 0; i < arr.length; i++) {
    const element = arr[i]
    let flag = callback(element, i)
    if (flag) return element
  }
}
/* 
  findIndex() 
*/
function myFindIndex(arr, callback) {
  for (let i = 0; i < arr.length; i++) {
    const element = arr[i]
    let flag = callback(element, i)
    if (flag) return i
  }
  return -1
}
//some  every  