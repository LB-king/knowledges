//命名空间 & 模块化
// export namespace A {
//   class Animal {

//   }
// }
// namespace B {
//   class Animal {

//   }
// }

//类装饰器：类装饰器在类声明之前被声明(紧靠着类声明)。类装饰器应用于类构造函数，可以用来监视，修改或者替换类定义。传入一个参数。
//1.类装饰器-无参数，params就是Animal类，所以可以在这个方法上扩展属性和方法
// function logClass(params: any) {
//   console.log(params)
//   // params.keyword = 'xxx' //这样写不生效,该属性是直接定义在类身上的
//   params.prototype.say = function () {
//     console.log('SAY是装饰器中定义的方法')
//   }
// }
// @logClass
// class Animal {
//   name: string
//   constructor(name: string) {
//     this.name = name
//   }
// }
// var a: any = new Animal('犀牛')
// a.say()

// 2.类装饰器-有参数
/**
 *
 * @param params 指的是传入的参数
 * @param target 指的是Animal这个构造函数
 * @returns
 */
// function logClass(params: any) {
//   return function (target: any) {
//     target.prototype.basename = params
//   }
// }
// @logClass('类装饰器的参数')
// class Animal {
//   name: string
//   constructor(name: string) {
//     this.name = name
//   }
// }
// var a: any = new Animal('犀牛')
// console.log(a.basename)

//1.3类装饰器的重载
// function logClass(params: any) {
//   return class extends params {
//     baseName: string
//     constructor() {
//       super()
//       this.baseName = '修改后的名字'
//     }
//   }
// }
// @logClass
// class Animal {
//   baseName: string
//   constructor() {
//     this.baseName = '构造函数的名字'
//   }
// }
// var a: any = new Animal()
// console.log(a.baseName)

//2.属性装饰器
// function logClass(params: any) {
//   //params就是Animal类，所以可以在其原型上扩展属性和方法
//   params.prototype.say = () => {}
// }
// //属性装饰器
// function logProps(params: any) {
//   return function (target: any, propName: any) {
//     console.log(params) //属性装饰器传递的参数
//     console.log(target) //类的构造函数
//     console.log(propName) //属性名称
//     target[propName] = params //在这里可以修改属性的值了
//   }
// }
// @logClass
// class Animal {
//   name: string
//   @logProps('www.baidu.com')
//   propsTest: string | undefined
//   constructor(name: string) {
//     this.name = name
//   }
//   getData() {
//     console.log(this.propsTest)
//   }
// }
// var a: any = new Animal('犀牛')
// a.getData()

// 3.方法装饰器-有3个参数
// function logMethods(params: any) {
//   return function (target: any, attrName: any, desc: any) {
//     //  console.log(target)
//     //  console.log(attrName)
//     //  console.log(desc)
//     //添加属性
//     target.url = 'http://www.baidu.com'
//     //添加方法
//     target.run = function () {
//       console.log(this.name + 'RUNING')
//     }
//     //修改方法,即修改desc.value
//     //保存原来的方法
//     let oMethod = desc.value
//     desc.value = function (...args: any[]) {
//       //原来的方法也会执行，参数会传递过去
//       oMethod.apply(this, args)
//       //全部转换为字符串
//       return [...args].map((item) => `str-${item}`)
//     }
//   }
// }
// class Animal {
//   name: string
//   constructor(name: string) {
//     this.name = name
//   }
//   @logMethods('COOL')
//   getData() {
//     console.log('我是getData内部的方法', this.name)
//   }
// }
// var a: any = new Animal('犀牛')
// // console.log(a.url)
// a.run()
// console.log(a.getData(999, 'xxx'))

// 4.参数装饰器
function logParams(params: any) {
  return function (target: any, paramName: any, paramIndex: any) {
    console.log(target)
    console.log(paramName)
    console.log(paramIndex)
    target.apiUrl = params
  }
}

class Animal {
  h() {}
  getData(@logParams('pk') id: string) {
    console.log('getData内部的方法')
  }
}
var a: any = new Animal()
console.log(a.apiUrl)
