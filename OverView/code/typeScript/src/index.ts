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

//装饰器
// function logClass(params: any) {
//   console.log(params) //params就是HttpClient这个类,所以可以在params上扩展这个类的属性和方法
//   params.prototype.apiURL = 'xxx'
//   params.prototype.run = function (): void {
//     console.log('RUN')
//   }
// }

// @logClass
// class HttpClient {
//   constructor() {}
//   getData() {}
// }

// let h: any = new HttpClient()
// console.log(h.apiURL)
// h.run()

//装饰器工厂
function logClass(params: any) {
  console.log(params) //params就是HttpClient这个类,所以可以在params上扩展这个类的属性和方法
  return function (target: any) {
    console.log(target)
    target.prototype.run = function () {
      console.log('RUN~~~')
    }
  }
}

@logClass('工厂参数')
class HttpClient {
  constructor() {}
  getData() {}
}

let h: any = new HttpClient()
h.run()