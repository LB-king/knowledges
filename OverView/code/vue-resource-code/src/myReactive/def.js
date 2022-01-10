/**
 * 
 * @param {*} obj 
 * @param {*} key 
 * @param {*} value 
 * @param {*} enumerable 
 */
export default function def(obj, key, value, enumerable) {
  Object.defineProperty(obj, key, {
    value,
    enumerable,
    configurable: true,
    writable: true
  })
}
