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
    let X = this.snake.X
    let Y = this.snake.Y
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
    //检查是否吃到食物
    this.checkFood(X, Y)
    //设置蛇的XY
    try {
      this.snake.X = X
      this.snake.Y = Y
    } catch (err: any) {
      this.isLive = false
      window.alert(err.message + 'GAME OVER!')
    }

    this.isLive &&
      setTimeout(this.run.bind(this), 300 - (this.score.level - 1) * 30)
  }
  //左上右下：37,38,39,40
  handleKeydown(event: KeyboardEvent) {
    this.direction = event.key
  }
  //3.检测是否吃到食物
  checkFood(X: number, Y: number) {
    // console.log('snake', X, Y);
    // console.log('food',this.food.X, this.food.Y);
    if (this.food.X === X && this.food.Y === Y) {
      //1.食物改变位置
      this.food.changePos()
      //2.分数增加1分
      this.score.addScore()
      //3.蛇的身体加1
      this.snake.addBody()
    }
  }
}
