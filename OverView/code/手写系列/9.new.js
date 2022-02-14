/**
 *
 * @param {*} context
 * 1. 首先创建一个新的空对象
 * 2. 根据原型链，设置空对象的`__proto__`为构造函数的`prototype`
 * 3. 构造函数的this指向这个对象，执行构造函数的代码(为这个新对象添加属性)
 * 4. 判断函数的返回值类型，如果是引用类型，就返回这个引用类型的对象
 */
function myNew(context) {
  var newObj = new Object()
  Object.setPrototypeOf(newObj, context.prototype)
  // let res = context.call(newObj, ...[...arguments].slice(1))
  let res = context.apply(newObj, [...arguments].slice(1))
  return typeof res === 'object' ? res : newObj
}

function Person(name, age) {
  this.name = name
  this.age = age
}
var n1 = myNew(Person, 'xx', 12)
console.log(n1)
// var p1 = new Person('xx', 10)
// console.log(p1)
