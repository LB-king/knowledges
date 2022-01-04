import parse from './parse'
const templateStr = `
<div>
    <h3 class="box m1" id="main" name="ok">hello</h3>
    <ul>
      <li>AA</li>
      <li>BB</li>
      <li>CC</li>
    </ul>
  </div>
  `
/* 
  vue-loader以字符串的视角来看vue文件
*/

var ast = parse(templateStr)
console.log(ast)