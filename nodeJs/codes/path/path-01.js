const path = require('path')
const baseUrl = 'http://www.joke.com/home?bid=888&name=小丑'
console.log(path.normalize(baseUrl)) // http:\www.joke.com\home?bid=888&name=小丑
// join-连接路径
console.log(path.join(baseUrl, 'hk')) // http:\www.joke.com\home?bid=888&name=小丑\hk
// 判断是否是绝对路径
console.log(path.isAbsolute('/d/')) // true
console.log(path.isAbsolute('../d/')) // false
// resolve([from ...], to)-将 to 参数解析为绝对路径,给定的路径的序列是从右往左被处理的
console.log(path.resolve('/foo/ko', '/www', './joke/')) // E:\www\joke
console.log(path.resolve('/foo/ko', './www', './joke')) // E:\foo\ko\www\joke
console.log(path.resolve('/foo/bar', '/tem/hell')) // E:\tem\hell

console.log(path.dirname('/haha')) // /
console.log(path.basename('/ji')) // ji
console.log(path.extname('test.txt')) // .txt