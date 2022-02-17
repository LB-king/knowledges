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
var Person = /** @class */ (function () {
    function Person(name) {
        this.name = name;
    }
    Person.prototype.run = function () {
        console.log(this.name + "\u5728\u8DD1\u6B65~~~");
    };
    return Person;
}());
var Man = /** @class */ (function (_super) {
    __extends(Man, _super);
    function Man(name) {
        return _super.call(this, name) || this;
    }
    return Man;
}(Person));
var m = new Man('man');
m.run();
