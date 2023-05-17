import parseTemplateToTokens from './parseTemplateToTokens'
import { foldTokens } from './foldTokens'
import { renderTemplate } from './renderTemplate'

window.myMustache = {
  // 两个参数：1.模板字符串  2.数据源
  render(templateStr, dataSource) {
    let res = parseTemplateToTokens(templateStr)
    //把tokens数组结合数据展现

    let renderStr = renderTemplate(foldTokens(res), dataSource)
    return renderStr
  }
}
