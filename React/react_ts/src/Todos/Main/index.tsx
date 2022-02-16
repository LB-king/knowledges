import { ITodo, IItem } from '@/Interfaces'
import './index.css'
import Item from './Item'

export default function Main(props: IItem) {
  let { todos } = props
  return (
    <div>
      <ul>
        {todos.map((item: ITodo, index: number) => {
          return <Item key={index} item={item}></Item>
        })}
      </ul>
    </div>
  )
}
