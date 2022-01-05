/* 
  编写mustache核心代码
  
*/
import parseTemplateToTokens from "./parseTemplateToTokens"
export default {
  render(templateStr, data) {
    let res = parseTemplateToTokens(templateStr)
    console.log(res)
    return res
  }
}
