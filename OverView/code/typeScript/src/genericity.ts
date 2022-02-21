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
// interface IConfigFn {
//   (name: string, age: number): string
// }

// // function getInfo(name: string, age: number): string {
// //   return name + age
// // }

// var getInfo: IConfigFn = function (name: string, age: number): string {
//   return name + age
// }
// console.log(getInfo('牛犇', 1))

//泛型接口-1
// interface configFn {
//   <T>(value: T): T
// }

// let getData: configFn = function <T>(value: T): T {
//   return value
// }

// console.log(getData<string>('xxx'))
// console.log(getData<number>(18))

//泛型接口-2
// interface ConfigFn<T> {
//   (value: T): T
// }

// function getData<T>(value: T): T {
//   return value
// }

// let myGetData: ConfigFn<string> = getData
// console.log(myGetData('hello'))

//1.定义一个类，2.把类作为参数来约束数据传入的类型
// class User {
//   usename: string | undefined
//   password: string | undefined
// }

// class MySQL {
//   // add(article: Article): boolean {
//   add(user: User): boolean {
//     console.log(user)
//     //此处就会做数据库操作了~~
//     return true
//   }
// }
// //定义一个操作数据库的泛型方法
// class MySQL1<T> {
//   add(info: T): boolean {
//     console.log(info)
//     return true
//   }
// }

// let user = new User()
// user.usename = 'admin'
// user.password = '123456'

// let DB = new MySQL1<User>()
// DB.add(user)

// class User {
//   name: string | undefined
//   pass: string | undefined
//   constructor(name: string, pass: string) {
//     this.name = name
//     this.pass = pass
//   }
// }
// let u = new User('admin', '123456')

// class MySql<T> {
//   add(user: T): boolean {
//     console.log(user)
//     return true
//   }
// }
// let DB = new MySql<User>()
// DB.add(u)


