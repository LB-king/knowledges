exports.say = () => {
  console.log('hi sir')
}
module.exports.name = '2020 champion'

console.log(exports === module.exports) // true
console.log(module)