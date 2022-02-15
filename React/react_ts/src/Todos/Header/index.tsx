import { useState, useEffect } from 'react'
export default function Header(props) {
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
          if (e.keyCode === 13) {
            console.log(props)
            let {addTodo} = props
            let newTodo = {
              name: 'xxx',
              id: 9
            }
            addTodo(newTodo)
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
