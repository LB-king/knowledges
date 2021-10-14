//这是index.js
import { hi } from './m1'
console.log('index.js')
function sum(a: number, b: number): number {
  return a + b
}

// console.log(sum(11, 333))

// let [m, n] = [11, 33]
// console.log(m, n)

// console.log(hi)

const About = { name: '孙子兵法', age: 9 }
console.log(About)
About.age = 18
console.log(About)
