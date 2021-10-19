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
  set X(value: number) {
    //优化：值不变则无需改变
    if (this.X === value) return
    //蛇的取值范围
    if (value < 0 || value > 290) {
      //通知外部的容器，蛇完了
      throw new Error('撞墙了')
    }
    //不能调头
    if (
      this.bodies[1] &&
      (this.bodies[1] as HTMLElement).offsetLeft === value
    ) {
      console.log('水平方向发生调头了')
      //如果新值value>原来的值，表示向左运动，按右无效,继续向左运动
      if (value > this.X) {
        value = this.X - 10
      } else {
        value = this.X + 10
      }
    }
    //移动身体
    this.moveBody()
    this.head.style.left = value + 'px'
    //检测是否撞到自己
    this.headCrashBody()
  }
  set Y(value: number) {
    if (this.Y === value) return
    if (value < 0 || value > 290) {
      //通知外部的容器，蛇完了
      throw new Error('游戏结束！')
    }
    //不能调头
    if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value) {
      console.log('垂直方向发生调头了')
      //如果新值value>原来的值，表示向上运动，按下无效,继续向上运动
      if (value > this.Y) {
        value = this.Y - 10
      } else {
        value = this.Y + 10
      }
    }
    //移动身体
    this.moveBody()
    this.head.style.top = value + 'px'
    //检测是否撞到自己
    this.headCrashBody()
  }
  //4.增加身体
  addBody() {
    //向element中添加一个div
    this.element.insertAdjacentHTML('beforeend', '<div></div>')
  }
  //5.移动身体
  //从后向前遍历，前一个div会覆盖后一个div的位置
  moveBody() {
    for (let i = this.bodies.length - 1; i > 0; i--) {
      let X = (this.bodies[i - 1] as HTMLElement).offsetLeft + 'px'
      let Y = (this.bodies[i - 1] as HTMLElement).offsetTop + 'px'
      console.log(X, Y)
      ;(this.bodies[i] as HTMLElement).style.left = X
      ;(this.bodies[i] as HTMLElement).style.top = Y
    }
  }
  //6.头部撞上身体
  headCrashBody() {
    if (this.bodies.length > 4) {
      for (let i = 1; i < this.bodies.length; i++) {
        let body = this.bodies[i] as HTMLElement
        if (this.X === body.offsetLeft && this.Y === body.offsetTop) {
          throw new Error('撞到自己了~~~')
        }
      }
    }
  }
}
