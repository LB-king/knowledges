"use strict";
//类
//es5---使用构造函数,静态方法，实例方法，原型链方法
// class Person {
//   name: string
//   run():void {
//     console.log('run')
//   }
//   constructor(name: string) {
//     this.name = name
//   }
// }
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// let p = new Person('花满楼')
// p.run()
//2.ts中实现继承 extends   super
// class Person {
//   name: string
//   run(): void {
//     console.log(`${this.name}在跑步~~~`)
//   }
//   constructor(name: string) {
//     this.name = name
//   }
// }
// let p = new Person('路西法')
// p.run()
// class Man extends Person {
//   constructor(name: string) {
//     super(name)
//   }
// }
// let m = new Man('man')
// m.run()
//类中的修饰符
// public  公有，在类里面 子类，类外面都可以访问
// protected 保护类型 在类里面，子类里可以访问，在类外部没法访问
// private  私有  在类里面可以访问，子类 类外面没法访问
// 不加修饰符，则默认public
// class Person {
//   private name: string
//   run(): void {
//     console.log(`${this.name}在跑步~~~`)
//   }
//   constructor(name: string) {
//     this.name = name
//   }
// }
// let p = new Person('xx')
// console.log(p.name)
// //Man是Person的子类
// class Man extends Person {
//   constructor(name: string) {
//     super(name)
//   }
//   say() {
//     console.log(this.name)
//   }
// }
// let m = new Man('man')
// console.log(m.name)
//静态方法&实例方法
//es5
//ts静态方法
// function Person() {}
// Person.say = function () {}
// class Person {
//   name: string
//   constructor(name: string) {
//     this.name = name
//   }
//   static speak() {
//     console.log('静态方法')
//   }
//   run(): void {
//     console.log(`${this.name}在跑步~~~`)
//   }
// }
// let p = new Person('xx')
// Person.speak()
//多态
var Animal = /** @class */ (function () {
    function Animal(name) {
        this.name = name;
    }
    Animal.prototype.eat = function () { };
    return Animal;
}());
var Dog = /** @class */ (function (_super) {
    __extends(Dog, _super);
    function Dog(name) {
        return _super.call(this, name) || this;
    }
    Dog.prototype.eat = function () {
        return this.name + '喜欢吃肉';
    };
    return Dog;
}(Animal));
var d = new Dog('旺财');
console.log(d.eat());
var Cat = /** @class */ (function (_super) {
    __extends(Cat, _super);
    function Cat(name) {
        return _super.call(this, name) || this;
    }
    Cat.prototype.eat = function () {
        return this.name + '喜欢吃鱼';
    };
    return Cat;
}(Animal));
var c = new Cat('花花');
console.log(c.eat());
