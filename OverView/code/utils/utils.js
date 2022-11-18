/* 
  1.封装一个循环方法，可以遍历数组，也可以遍历对象
*/
function myEach(target, callback, context) {
	var type = getType(target)
	//如果不是数组或者对象，直接返回被处理的对象
	if (!/^array|object$/.test(type)) return callback(target)
	context = context == null ? window : context
	//遍历数组
	if (/^array$/.test(type)) {
		for (let i = 0, len = target.length; i < len; i++) {
			var res = callback.call(context, target[i], i, target)
			//回调函数返回false的情况,可以终止循环
			if (res === false) break
		}
	}
	//遍历对象
	if (/^object$/.test(type)) {
		var keys = Object.keys(target)
		for (let i = 0, len = keys.length; i < len; i++) {
			callback.call(context, target[keys[i]], keys[i], target)
		}
	}
}

/* 
  2.封装一个判断类型的方法
*/
function getType(target) {
	let type2obj = {}
	const arr = [
		'String',
		'Boolean',
		'Number',
		'Object',
		'Array',
		'Function',
		'Date',
		'RegExp',
		'Symbol',
		'Undefined',
		'Null',
		'Arguments',
		'HTMLCollection',
		'Error',
		'BigInt', //9007199254740991n
		'Window',
		'Set',
		'Promise'
	]
	arr.forEach(item => {
		type2obj[`[object ${item}]`] = item.toLowerCase()
	})
	return type2obj[Object.prototype.toString.call(target)]
}

/**
 *
 * @param {*} targetObj 取值的对象
 * @param {*} pathString 路径字符串
 * @param {*} defaultValue 默认值
 */
function getObjectValue(targetObj, pathString, defaultValue) {
	if (typeof pathString !== 'string') {
		return defaultValue
	}
	var res = (0, getPropByPath)(targetObj || {}, pathString, false).v
	if (res || typeof res === 'number' || typeof res === 'boolean') {
		return res
	}
	return defaultValue
}
function getPropByPath(obj, path, strict) {
	var tempObj = obj
	path = path.replace(/\[(\w+)\]/g, '.$1')
	path = path.replace(/^\./, '')

	var keyArr = path.split('.')
	var i = 0
	for (var len = keyArr.length; i < len - 1; ++i) {
		if (!tempObj && !strict) break
		var key = keyArr[i]
		if (key in tempObj) {
			tempObj = tempObj[key]
		} else {
			if (strict) {
				throw new Error('please transfer a valid prop path to form item!')
			}
			break
		}
	}
	return {
		o: tempObj,
		k: keyArr[i],
		v: tempObj ? tempObj[keyArr[i]] : null
	}
}
// if (window !== 'undefined') {
// 	window._ = {
// 		getType,
// 		myEach
// 	}
// }

(0, t)()
function t() {
  console.log('t')
}

