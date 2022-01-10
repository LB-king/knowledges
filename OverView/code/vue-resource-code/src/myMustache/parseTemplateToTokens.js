/* 
  1.模板字符串 编译为 tokens
*/
import Scanner from './Scanner'
import foldTokens from './foldTokens'
export default function parseTemplateToTokens(templateStr) {
  var tokens = []
  var scanner = new Scanner(templateStr)
  var words
  //让扫描器开始工作
  while (!scanner.eos()) {
    //收集开始标记之前的内容
    words = scanner.scanUntil('{{')
    scanner.scan('{{')
    // console.log(words)
    words && tokens.push(['text', words])
    //收集标记之间的内容
    words = scanner.scanUntil('}}')
    scanner.scan('}}')
    // console.log(words)
    if (words) {
      if (words.startsWith('#')) {
        tokens.push(['#', words.substring(1)])
      } else if (words.startsWith('/')) {
        tokens.push(['/', words.substring(1)])
      } else {
        tokens.push(['name', words])
      }
    }
  }
  return foldTokens(tokens)
}
