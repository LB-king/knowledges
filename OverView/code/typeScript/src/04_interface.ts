//属性类型接口
// interface IFullName {
//   firstName: string
//   lastName: string
//   //可选属性
//   age?: number
// }

// function getInfo(nameObj: IFullName) {
//   if(nameObj.age === undefined) return 'no age'
//   return (nameObj.firstName + nameObj.lastName)
// }
// let n = {
//   firstName: 'FIRST',
//   lastName: 'LAST',
//   // age: 99
// }
// console.log(getInfo(n))

//封装一个简易版本的ajax
// interface Config {
//   method: string
//   url: string
//   data?: string
//   // dataType: string
// }

// function Ajax(config: Config) {
//   let xhr = new XMLHttpRequest()
//   xhr.open(config.method, config.url)

//   xhr.onreadystatechange = function () {
//     if (xhr.readyState === 4 && xhr.status === 200) {
//       console.log('success')
//       console.log(xhr.responseText)
//     }
//   }
//   xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
//   xhr.send(config.data)
// }
// //此处可封装data
// Ajax({
//   method: 'get',
//   url: `https://api.github.com/search/users?q=ok`,
//   // data: 'q=kk',
//   // dataType: 'javascript/json'
// })

//函数类型接口
// interface encrypt {
//   (key: string, value: string): string
// }

// let md5: encrypt = function (key: string, value: string) {
//   return key + value
// }
// console.log(md5('name', '犀牛'))

// let sha1: encrypt = function (key: string, value: string) {
//   return key + value + 'xxxx'
// }
// console.log(sha1('name', '犀牛'))

//可索引的接口-对数组的约束
// let arr: number[] = [111, 222]
// let arr1: Array<string> = ['111']
// interface UserArr {
//   [index: number]: string
// }
// let arr: UserArr = ['AAA', 'BBB']

// interface UserObj {
//   [index: string]: string
// }

// let arr1:UserObj = {
//   name: 'xx',
//   favs: 'ball'
// }

//类类型接口 对类的约束，和抽象类有点相似
// interface IAnimal {
//   name: string
//   eat(str: string): void
// }

// class Dog implements IAnimal {
//   name: string
//   constructor(name: string) {
//     this.name = name
//   }
//   eat() {
//     console.log(this.name)
//   }
// }

// var d = new Dog('旺财')
// d.eat()

//接口的继承,接口扩展
// interface IAnimal {
//   eat(): void
// }
// interface IPerson extends IAnimal {
//   work(): void
// }
// class Person {
//   run() {
//     console.log('run')
//   }
// }
// class Man extends Person implements IPerson {
//   eat() {
//     console.log('eat')
//   }
//   work() {
//     console.log('work')
//   }
// }
// let m = new Man()
// m.eat()
// m.work()
// m.run()
