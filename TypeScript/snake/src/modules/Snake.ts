export default class Snake {
  //1.定义一个蛇的容器,获取蛇头
  head: HTMLElement
  bodies: HTMLCollection
  element: HTMLElement
  constructor() {
    this.element = document.getElementById('snake')!
    this.head = document.querySelector('#snake > div') as HTMLElement //表示获取snake中的第一个div
    this.bodies = this.element.getElementsByTagName('div')
  }

  //2.头的坐标
  get X() {
    return this.head.offsetLeft
  }
  get Y() {
    return this.head.offsetTop
  }
  //3.设置头的坐标
  set X(value) {
    //优化：值不变则无需改变
    if (this.X === value) return
    //蛇的取值范围
    if (value < 0 || value > 290) {
      //通知外部的容器，蛇完了
      throw new Error('撞墙了')
    }
    this.head.style.left = value + 'px'
  }
  set Y(value) {
    if (this.Y === value) return
    if (value < 0 || value > 290) {
      //通知外部的容器，蛇完了
      throw new Error('撞墙了')
    }
    this.head.style.top = value + 'px'
  }
  //4.增加身体
  addBody() {
    //向element中添加一个div
    this.element.insertAdjacentHTML('beforeend', '<div></div>')
  }
}
