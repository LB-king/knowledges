"use strict";
// 数组定义的2种方式
// let arr: number[] = [1, 2, 3]
// let arr: Array<number> = [1, 2, 3]
// let arr: [number, string] = [11, 'ui']
// let arr: Array<number | string> = [11, 'ui']
// let arr: any = [11, 33, 'hello']
//元祖类型
// let arr: [number, string, boolean] = [11, 'str', true]
// let box: any = document.getElementById('box')
// box.style.color = 'red'
//联合类型写法
// let num:number | undefined | null
// num = 9
//枚举类型
// enum colors {
//   red,
//   blue = 'ui',
//   green = 'green'
// }
// console.log(colors.blue)
//函数没有任何返回值
// function fn(): void {
//   console.log('fn')
// }
// fn()
//函数有返回值
// function fn(): string {
//   console.log('fn')
//   return 'str'
// }
// fn()
//never类型
// function fn():never {
//   throw new Error('报错')
// }
