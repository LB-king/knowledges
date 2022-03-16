export const getType = function (target) {
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
  arr.forEach((item) => {
    type2obj[`[object ${item}]`] = item.toLowerCase()
  })
  return type2obj[Object.prototype.toString.call(target)]
}

