/**
 *连续路径取对象的值
 * @param {*} obj 取值的对象
 * @param {*} path 用.连起来的连续路径,如  'a.b.c.d'
 * @param {*} defaultValue 默认值,路径有误的时候可以返回这个默认值
 */
export const objectProperty = (obj, path, defaultValue = '') => {
  if (!obj) return ''
  if (path !== '.') {
    let paths = path.split('.')
    while (paths.length > 0) {
      var key = paths.shift()
      obj = obj[key]
      if (!obj) return defaultValue
    }
  }
  return obj
}
