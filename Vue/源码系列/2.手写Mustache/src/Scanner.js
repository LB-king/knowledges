export default class Scanner {
  constructor(templateStr) {
    this.templateStr = templateStr
    //指针
    this.pos = 0
    //剩余部分
    this.tail = templateStr
  }
  //走过指定内容，没有返回值
  scan(tag) {
    if (this.tail.indexOf(tag) === 0) {
      this.pos += tag.length
      this.tail = this.templateStr.substring(this.pos)
    }
  }

  //让指针进行扫描，直到遇见指定的内容结束，并且返回结束之前经过的文字
  scanUntil(endTag) {
    //把开始扫描的下标记录下来
    let start_pos = this.pos
    while (!this.eos() && this.tail.indexOf(endTag) !== 0) {
      this.pos++
      this.tail = this.templateStr.substring(this.pos)
    }
    return this.templateStr.substring(start_pos, this.pos)
  }

  //end of string
  eos() {
    return this.pos >= this.templateStr.length
  }
}
