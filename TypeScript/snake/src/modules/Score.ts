export default class Score {
  //1.分数和等级,最高等级
  score = 0
  level = 1
  maxLevel: number //最高等级，可自定义
  stepScore: number //每10分升级，可自定义
  //2.分数和等级所在的元素
  scoreEle: HTMLElement
  levelEle: HTMLElement
  constructor(maxLevel: number = 10, stepScore: number = 10) {
    this.scoreEle = document.getElementById('score')!
    this.levelEle = document.getElementById('level')!
    this.maxLevel = maxLevel
    this.stepScore = stepScore
    
  }
  //3.定义加分的方法
  addScore() {
    this.scoreEle.innerHTML = ++this.score + ''
    //每10分升级
    if(this.score % this.stepScore === 0) this.addLevel()
  }
  //4.等级提升的方法
  addLevel() {
    if (this.level < this.maxLevel) {
      this.levelEle.innerHTML = ++this.level + ''
    }
  }
}
