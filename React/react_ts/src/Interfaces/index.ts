//todo的类型
export interface ITodo {
  id: string
  name: string
}
export interface IItem {
  todos: Array<ITodo>
}
