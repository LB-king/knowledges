interface ITodo {
  id: string
  name: string
}
export default function Item(props: { item: ITodo }) {
  let { item } = props
  return (
    <li>
      <label>
        <input type="checkbox" />
        {item.name}
      </label>
    </li>
  )
}
