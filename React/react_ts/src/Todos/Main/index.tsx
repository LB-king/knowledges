import './index.css'
import Item from './Item'
export default function Main(props: { todos: any }) {
  let {todos} = props
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
