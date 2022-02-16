import './index.css'
import Item from './Item'
interface ITodo {
  id: string
  name: string
}
interface IItem {
  todos: Array<ITodo>
}
export default function Main(props: IItem) {
  let { todos } = props
  return (
    <div>
      <ul>
        {todos.map((item: any, index: number) => {
          return <Item key={index} item={item}></Item>
        })}
      </ul>
    </div>
  )
}
