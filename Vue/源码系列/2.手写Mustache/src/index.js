import parseTemplateToTokens from './parseTemplateToTokens'
import { foldTokens } from './foldTokens'
window.myMustache = {
  // 两个参数：1.模板字符串  2.数据源
  render(templateStr, dataSource) {
   let res = parseTemplateToTokens(templateStr)
   console.log('UI_LOG: ', foldTokens(res))
   return res
  }
}
