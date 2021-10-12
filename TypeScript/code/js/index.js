"use strict";
var str = 'hello';
var n = 99;
var flag = true;
// flag = 88
//1.第一种定义数组的方法
// let arr:number[] = [1,2,3]
// let arr:string[] = ['abc']
//2.第一种定义数组的方法
var arr = [11, 22];
var arr1 = ['demo'];
console.log(flag);
//元祖类型
var arr2 = ['dr', 23, false];
//枚举类型
var Flag;
(function (Flag) {
    Flag[Flag["success"] = 1] = "success";
    Flag[Flag["fail"] = 0] = "fail";
})(Flag || (Flag = {}));
var f = Flag.fail;
console.log(f); //0
var Color;
(function (Color) {
    Color[Color["red"] = 0] = "red";
    Color[Color["blue"] = 1] = "blue";
    Color[Color["orange"] = 2] = "orange";
})(Color || (Color = {}));
console.log(Color.blue); //没有赋值的话，打印出来的是索引值1
