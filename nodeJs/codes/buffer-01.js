const buf = Buffer.from('hello哈喽', 'ascii')
console.log(buf.toString('ascii'))
console.log(buf.toString('base64'))

const buf1 = Buffer.alloc(10)
const buf2 = Buffer.alloc(10, 1)
const buf3 = Buffer.allocUnsafe(10)
const buf4 = Buffer.from([1, 2, 3])
const buf5 = Buffer.from('test')
const buf6 = Buffer.from('test', 'latin1')
console.log(buf1) // <Buffer 00 00 00 00 00 00 00 00 00 00>
console.log(buf2) // <Buffer 01 01 01 01 01 01 01 01 01 01>
console.log(buf3) // <Buffer 00 e9 91 46 ff ff ff ff 00 00>
console.log(buf4) // <Buffer 01 02 03>
console.log(buf5) // <Buffer 74 65 73 74>
console.log(buf6) // <Buffer 74 65 73 74>

const bf = Buffer.alloc(10)
const len = bf.write("www.runoob.com")
console.log('写入字节数：' + len) // 写入字节数：14
// 从缓冲区读取数据
console.log(bf.toString('ascii', 0, 6)) // www.ru
// bf.toString([encoding[, start[, end]]])
// 将Buffer转化为json对象
console.log(bf.toJSON())
/* { 
  type: 'Buffer',
  data: [ 119, 119, 119, 46, 114, 117, 110, 111, 111, 98 ] 
  } */

const buf11 = Buffer.from([0x1, 0x2, 0x3, 0x4, 0x5]);
const json = JSON.stringify(buf);
console.log(json) // {"type":"Buffer","data":[104,101,108,108,111,200,189]}
const res = JSON.parse(json, (key, value) => {
  return value && value.type === 'Buffer' ? Buffer.from(value.data) : value
})
console.log(res) // <Buffer 68 65 6c 6c 6f c8 bd>

// 缓冲区合并 Node缓冲区合并的语法
const res1 = Buffer.concat([buf1, buf2])
console.log(res1) // <Buffer 00 00 00 00 00 00 00 00 00 00 01 01 01 01 01 01 01 01 01 01>