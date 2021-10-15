;(() => {
  //属性的封装
  /* TS可以在属性前添加属性的修饰符
        public-修饰的属性可以在任意位置修改，默认值
        private-私有属性只能在类内部进行访问
          -通过在类中添加方法使得私有属性可以被外部访问
  */
  class Person {
    private _name: string
    private _age: number
    constructor(name: string, age: number) {
      this._name = name
      this._age = age
    }
    
   /*  //获取name
    getName() {
      return this._name
    }
    //修改name
    setName(val) {
      this._name = val
    }
    setAge(val) {
      if(val >= 0) {
        this._age = val
      }
    } */

    //ts中的getter方法
    // get name():string {
    //   return this._name
    // }
  }

  var per = new Person('jack', 12)
  /* 
  属性是在对象中设置的，属性可以被任意修改，
    属性可以任意修改会导致对象中的数据变得不安全
  */
  // per.setName('kaido')
  // per.setAge(-9) //不生效
  console.log(per)
})()
