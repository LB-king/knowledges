// import mustache from 'mustache'
import mustache from './js/myMustache'
var tmpStr = document.getElementById('tmp').innerHTML
var box = document.getElementById('box')
var objData = {
  name: 'MUSTACHE语法测试',
  good: '火箭',
  mood: '非常好',
  data: [
    { name: '奔驰', price: 99, colors: ['red', 'blue'] },
    { name: '宝马', price: 78, colors: ['yellow', 'pink'] },
    { name: '奥迪', price: 90 }
  ],
  show: true
}
var htmlStr = mustache.render(tmpStr, objData)

box.innerHTML = htmlStr
