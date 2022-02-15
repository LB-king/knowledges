export default function Item(props) {
  let {item} = props
  return (
    <li>
      <label>
        <input type="checkbox"/>{item.name}
      </label>
    </li>
  )
}
