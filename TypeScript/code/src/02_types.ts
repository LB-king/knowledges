//1.对象属性限制
var a: { name: string; age?: number } //结构要一模一杨
a = { name: 'tom', age: 9 }
//2.name之外的属性不做限制
var b: { name: string; [propName: string]: unknown }
b = { name: 'b', age: 18, favo: 'play' }
//3.函数限制
//设置函数的类型声明
//语法：
// (形参:类型,形参:类型...) => 返回值
var c: (a: number, b: number) => number
c = (m: number, n: number) => m + n
//元组
var h: [string, string]
h = ['2', '9']
//枚举

//连接符
var user: {name: string} & {age: number}
user = {
  name: 'ko',
  age: 99
}

//类型的别名
type myType = 1 | 2 | 3
let j: myType
let k: myType
console.log('ui11')