import { useState, useEffect } from 'react'
interface IProps {
  addTodo: Function
}
export default function Header(props: IProps) {
  const { addTodo } = props
  let [content, setContent] = useState('')
  return (
    <div>
      <header className="hello">TODOS</header>
      <input
        type="text"
        value={content}
        placeholder="输入信息"
        onChange={(e) => {
          setContent(e.target.value)
        }}
        onKeyDown={(e) => {
          if (e.keyCode === 13 && content) {
            addTodo(content)
            //按下enter的时候触发
            setContent('')
          }
        }}
        // onBlur={() => {
        //   setContent('')
        // }}
      />
    </div>
  )
}
