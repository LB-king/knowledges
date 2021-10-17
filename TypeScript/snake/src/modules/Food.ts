export default class Food {
  //定义一个属性表示食物对应的元素
  element: HTMLElement
  constructor() {
    this.element = document.getElementById('food')!;
  }
}