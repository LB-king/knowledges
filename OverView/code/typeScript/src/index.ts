//只能返回string
// function getData(value: string): string {
//   return value
// }

//同时返回string和number,不考虑any
//传number返回number   传string返回string
//泛型支持不特定的数据类型
//T表示泛型，具体什么类型是调用这个方法的时候决定的,这个大写的T可以用其他任意大写字母代替
// function getData<T>(value: T): T {
//   return value
// }

// console.log(getData<string>('hooks'))
// console.log(getData<number>(9))

//泛型类
// class MinClass<T> {
//   list: T[] = []
//   add(n: T): void {
//     this.list.push(n)
//   }
//   min(): T {
//     let res = this.list[0]
//     this.list.forEach((item) => {
//       if (item < res) res = item
//     })
//     return res
//   }
// }

// var m1 = new MinClass<number>()
// m1.add(1)
// m1.add(4)
// m1.add(44)
// console.log(m1.min())
// var m2 = new MinClass<string>()
// m2.add('AA')
// m2.add('BB')
// m2.add('CC')
// console.log(m2.min())

//函数类型接口
interface IConfigFn {
  (name: string, age: number): string
}

// function getInfo(name: string, age: number): string {
//   return name + age
// }

var getInfo: IConfigFn = function (name: string, age: number): string {
  return name + age
}
console.log(getInfo('牛犇', 8))
