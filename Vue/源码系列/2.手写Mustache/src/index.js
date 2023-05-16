import parseTemplateToTokens from './parseTemplateToTokens'
import { foldTokens } from './foldTokens'
window.myMustache = {
  // 两个参数：1.模板字符串  2.数据源
  render(templateStr, dataSource) {
   let res = parseTemplateToTokens(templateStr)
   return foldTokens(res)
  }
}
