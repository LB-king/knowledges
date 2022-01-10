/* 
  定义一个 扫描器类，用来把模板字符串编译为tokens
  
  */
export default class Scanner {
  constructor(templateStr) {
    //模板字符串定义到实例上
    this.templateStr = templateStr
    //指针
    this.pos = 0
    //尾巴-模板字符串的剩余部分
    this.tail = templateStr
  }
  //扫描方法：移动指针
  scan(tag) {
    if (this.tail.indexOf(tag) === 0) {
      this.pos += tag.length
      this.tail = this.templateStr.substring(this.pos)
    }
  }
  //让指针进行扫描，遇到指定内容结束，并且能够返回之前扫描的内容
  scanUntil(endTag) {
    let startPos = this.pos
    //当尾巴的开头不是endTag的时候，说明没有扫描到endTag
    while (!this.eos() && this.tail.indexOf(endTag) != 0) {
      this.pos++
      //尾巴是剩余字符串
      this.tail = this.templateStr.substring(this.pos)
    }
    return this.templateStr.substring(startPos, this.pos)
  }
  //返回布尔值  endOfString,判断指针是否到头
  eos() {
    return this.pos >= this.templateStr.length
  }
}
