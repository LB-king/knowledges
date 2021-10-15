 //定义食物的类
 export default class Food {
  //定义一个属性表示食物对应的元素
  element: HTMLElement
  constructor() {
    this.element = document.getElementById('food')
  }
  //获取食物x轴
  getX() {
    return this.element.offsetLeft
  }
  //获取食物y轴
  getY() {
    return this.element.offsetTop
  }
  //修改食物的位置
  changePos() {
    //随机位置
    let top = Math.round(Math.random() * 29) * 10
    let left = Math.round(Math.random() * 29) * 10
    this.element.style.top = top + 'px'
    this.element.style.left = left + 'px'
  }
}