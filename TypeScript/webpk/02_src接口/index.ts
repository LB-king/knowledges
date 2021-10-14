//抽象类
abstract class Animal {
  name: string
  age: number
  //定义一个抽象方法，抽象方法必须定义在抽象类中，子类必须对抽象方法进行重写
  abstract speak(): void
}

//描述一个对象的类型
type myType = {
  name: string
  age: number
}

const obj: myType = {
  name: 'dog',
  age: 9
}

/* 接口用来定义一个类结构，定义一个类中应该包含哪些属性和方法，
    接口也可以当做类型声明去使用
*/

interface myInterface {
  name: string
  age: number
}
interface myInterface {
  gender: string
}

let tom: myInterface = {
  name: 'tom',
  age: 8,
  gender: 'man'
}

/* 接口中的所有的属性都不能有实际的值
      接口只定义对象的结构，而不去考虑实际值
        在接口中所有的方法都是抽象方法
*/
interface myInter {
  name: string
  say(): void
}
class MyIn implements myInter {
  name: string
  constructor(name: string) {
    this.name = name
  }
  say() {
    console.log('hi~~')
  }

}
