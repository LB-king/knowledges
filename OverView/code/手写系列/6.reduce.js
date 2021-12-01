/* 
  reduce() 从左到右为每一个数组元素执行一次回调函数，并把上次回调函数的返回值放在一个暂存器中
  注意：index在初始值initialValue有值时，从0开始，
          initialValue没有赋值时，acc作为第一项，此时index为1  
*/

function myReduce(arr, callback, initialValue = null) {
  let res = initialValue
  for (let i = 0; i < arr.length; i++) {
    res = callback(res, arr[i], initialValue ? i : i + 1)
  }
  return res
}
