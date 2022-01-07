/* 
  编写mustache核心代码
  
*/
import parseTemplateToTokens from "./parseTemplateToTokens"
import renderTemplate from "./renderTemplate"
export default {
  render(templateStr, data) {
    let res = parseTemplateToTokens(templateStr)
    //把tokens数组变成dom字符串
    var domStr = renderTemplate(res, data)
    console.log(domStr)
    return domStr
  }
}
