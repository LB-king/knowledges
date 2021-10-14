"use strict";
var str = 'hello';
var n = 99;
var flag = true;
var arr = [11, 22];
var arr1 = ['demo'];
console.log(flag);
var arr2 = ['dr', 23, false];
var Flag;
(function (Flag) {
    Flag[Flag["success"] = 1] = "success";
    Flag[Flag["fail"] = 0] = "fail";
})(Flag || (Flag = {}));
var f = Flag.fail;
console.log(f);
var Color;
(function (Color) {
    Color[Color["red"] = 0] = "red";
    Color[Color["blue"] = 4] = "blue";
    Color[Color["orange"] = 5] = "orange";
})(Color || (Color = {}));
console.log(Color.orange);
var Num;
console.log(Num);
function Void() {
    console.log('void');
    return 2;
}
Void();
function getInfo(name, age) {
    if (age === void 0) { age = 88; }
    return name + "---" + age;
}
console.log(getInfo('KG'));
var un;
un = 9;
un = 'ui';
var m;
function fn() {
    throw new Error('报错');
}
