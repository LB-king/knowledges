//计分板类
export default class ScorePanel {
  //score和level用来记录分数和等级
  score = 0
  level = 1
  scroreElement: HTMLElement
  levelElement: HTMLElement
  //最大的等级
  maxLevel: number
  //多少分时就升级
  upScore: number
  constructor(maxLevel: number = 10, upScore: number = 10) {
    this.scroreElement = document.getElementById('score')!
    this.levelElement = document.getElementById('level')!
    this.maxLevel = maxLevel
    this.upScore = upScore
  }
  //加分的方法
  addScore() {
    this.scroreElement.innerHTML = ++this.score + ''
    if(this.score % this.upScore === 0) {
      this.addLevel()
    }
  }
  //加等级的方法
  addLevel() {
    if (this.level < this.maxLevel) {
      this.levelElement.innerHTML = ++this.level + ''
    }
  }
}