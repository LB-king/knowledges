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
  blue = 4,
  orange
}
console.log(Color.orange) //没有赋值的话，打印出来的是索引值1,如果blue是4，则打印出来的orange是5

// 任意类型
var Num: number | undefined
console.log(Num)

function Void(): number {
  console.log('void')
  return 2
}
Void()

/* function getInfo(name:string, age:number):string {
  return `${name}---${age}`
}

console.log(getInfo('KG',66)) */

//可选参数
/* function getInfo(name:string, age?:number):string {
  return `${name}---${age}`
}

console.log(getInfo('KG')) */

//默认参数
function getInfo(name: string, age: number = 88): string {
  return `${name}---${age}`
}

console.log(getInfo('KG'))

//未知类型
let un: unknown
un = 9
un = 'ui'

let m: string
// let un: any
// m = un 不报错

// let un: unknown
// m = un //报错
// let a: unknown
// let b: string
// a = 99
// a = 'ui'
// if (typeof a === 'string') {
//   b = a
// }
//类型断言,可以用来告诉解析器变量的实际类型
// b = a as string
// b = <string>a



function fn():never {
  throw new Error('报错')
}