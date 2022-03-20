let oldArrayProto = Array.prototype
// 基于原始数组的原型新建一个空的对象
let newArrayProto = Object.create(oldArrayProto)
let arrs = ['push']
arrs.forEach(methodName => {
 // 定义数组，保存原型上的方法
})
export default newArrayProto