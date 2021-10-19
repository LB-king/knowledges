export default class Food {
  //1.定义一个属性表示食物对应的元素
  element: HTMLElement
  constructor() {
    this.element = document.getElementById('food')!
    // this.changePos()
  }
  //2.获取元素X轴偏移量
  get X() {
    return this.element.offsetLeft
  }
  //3.获取元素Y轴偏移量
  get Y() {
    return this.element.offsetTop
  }
  //4.改变食物的位置,并且蛇的移动距离是10，所以食物的位置必须是整数10
  //位置随机生成，并且不在蛇的身体上
  changePos() {
    let top = Math.round(Math.random() * 29) * 10
    let left = Math.round(Math.random() * 29) * 10
    this.element.style.left = left + 'px'
    this.element.style.top = top + 'px'
  }
}
