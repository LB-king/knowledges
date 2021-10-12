let str: string = 'hello'
let n: number = 99

var flag: boolean = true
// flag = 88
//1.第一种定义数组的方法
// let arr:number[] = [1,2,3]
// let arr:string[] = ['abc']
//2.第一种定义数组的方法
let arr: Array<number> = [11, 22]
let arr1: Array<string> = ['demo']
console.log(flag)

//元祖类型
let arr2: [string, number, boolean] = ['dr', 23, false]
//枚举类型
enum Flag {
  success = 1,
  fail = 0
}
var f: Flag = Flag.fail
console.log(f) //0

enum Color {
  red,
  blue,
  orange
}
console.log(Color.blue) //没有赋值的话，打印出来的是索引值1
