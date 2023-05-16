import ScannerClass from './Scanner.js'
/**
 * 这个函数是把模板字符串转换为tokens数组，但是里面的#之间的内容还没有折叠，需要写一个折叠的方法去处理tokens数组。
 * @param {*} templateStr 
 * @returns 
 */
export default function parseTemplateToTokens(templateStr) {
  var Scanner = new ScannerClass(templateStr)
  let word, //截取的内容
    pos, //开始的下标
    tokens = []
  while (!Scanner.eos()) {
    //扫描之前的pos下标,先存起来，和mustache官方保持一致的数据
    pos = Scanner.pos
    //收集开始到{{之间的内容
    word = Scanner.scanUntil('{{')
    //让指针过{{
    Scanner.scan('{{')
    //收集startPos和endPos
    word && tokens.push(['text', word, pos, Scanner.pos])
    pos = Scanner.pos
    word = Scanner.scanUntil('}}')
    Scanner.scan('}}')
    if (word) {
      if (word.startsWith('#')) {
        tokens.push(['#', word.substring(1), pos, Scanner.pos])
      } else if (word.startsWith('/')) {
        tokens.push(['/', word.substring(1), pos, Scanner.pos])
      } else {
        tokens.push(['name', word, pos, Scanner.pos])
      }
    }
  }
  return tokens
}
