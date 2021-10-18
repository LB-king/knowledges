import Snake from './Snake'
import Food from './Food'
import Score from './Score'
//游戏控制中心
export default class GameCenter {
  snake: Snake
  food: Food
  score: Score
  //存一个方向
  direction: string = ''
  isLive: boolean = true
  constructor() {
    this.snake = new Snake()
    this.food = new Food()
    this.score = new Score()
    this.init()
  }

  //1.初始化方法
  init() {
    //1.监听键盘的按键事件
    document.addEventListener('keydown', this.handleKeydown.bind(this))
    this.run()
  }
  //2.创建一个让蛇移动的方法
  /* 
  根据方向使蛇的位置发生改变
  向上：top减少
  向下：top增加
  向左：left减少
  向右：left增加

  */
  run() {
    //1.获取蛇现在的坐标
    let [X, Y] = [this.snake.X, this.snake.Y]
    //2.根据方向计算新的坐标
    switch (this.direction) {
      case 'ArrowLeft':
      case 'Left':
        X -= 10
        break
      case 'ArrowUp':
      case 'Up':
        Y -= 10
        break
      case 'ArrowRight':
      case 'Right':
        X += 10
        break
      case 'ArrowDown':
      case 'Down':
        Y += 10
        break
    }
    try {
      this.snake.X = X
      this.snake.Y = Y
    } catch (e) {
      console.log(e)
      // this.isLive = false
      // window.alert('GAME OVER!')
    }
    this.isLive &&
      setTimeout(this.run.bind(this), 300 - (this.score.level - 1) * 30)
  }
  //左上右下：37,38,39,40
  handleKeydown(event: KeyboardEvent) {
    this.direction = event.key
  }
}
