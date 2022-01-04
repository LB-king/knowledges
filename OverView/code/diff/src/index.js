import mustache from './mustache'
var data = [
  { name: '奔驰', price: 18 },
  { name: '宝马', price: 20 },
  { name: '奥迪', price: 20 }
]
var list = document.getElementById('list')
//1.纯dom实现
/* for(let i = 0 ; i< data.length; i++) {
  let oli = document.createElement('li')
  oli.innerText = data[i].name
  list.appendChild(oli)
} */
//2.数组join法-基于字符串不能换行,结构化展示数据
/* for (let i = 0; i < data.length; i++) {
  list.innerHTML += [
    '<li>'+ data[i].name + '</li>',
    '<li>',
    ' <p>'+ data[i].price + '</p>', 
    '</li>'
    ].join('')
}
 */
//3.es6的模板字符串,支持换行
/* for(let i = 0; i < data.length; i++) {
  list.innerHTML += `
    <p>名字:${data[i].name}</p>
    <p>价格:${data[i].price}</p>
  `
} */
// 4.mustache-模板引擎的使用,最早的mustache模板引擎库
