"use strict";
//函数的定义,返回的是字符串
// function run(): string {
//   //  return 12
//   return 'str'
// }
//参数和返回值都需要类型约定
// function run(name: string, age: number): string {
//   return name + age
// }
// console.log(run('kb', 35))
//没有返回值的方法
// function f1():void {
//   console.log(8)
// }
//可选参数，es5中实参和形参可以不一样
// function getInfo(name: string, age?: number): string {
//   if (age === undefined) return name + '年龄保密'
//   return name + age
// }
// console.log(getInfo('kb'))
//默认参数
// function getInfo(name: string, age: number = 12): string {
//   if (age === undefined) return name + '年龄保密'
//   return name + age
// }
// console.log(getInfo('kb'))
//剩余参数
//bad
// function sum(a: number, b: number, c: number, d: number) {
//   return a + b + c + d
// }
// function sum(...res: number[]) {
//   return res.reduce((cur, acc) => cur + acc)
// }
// console.log(sum(1, 2, 3, 4, 88))
//函数重载
//es5下面会替换上面的方法
// function run() {}
// function run() {}
//ts中重载
// function run(name: string): string
// function run(age: number): number
// function run(str: any): any {
//   if (typeof str === 'string') {
//     return `传入的是字符串：${str}`
//   } else {
//     return `传入的是数值：${str}`
//   }
// }
// console.log(run('犀牛'))
// console.log(run(88))
