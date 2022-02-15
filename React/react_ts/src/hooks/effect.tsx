import React, { Component, useState, useEffect } from 'react'
/**
 * 副作用  组件挂载完毕，组件更新完成， 组件即将卸载
 */
interface AInterface {
  content: string
  setContent: Function
}
function Acom(props: AInterface) {
  let { content, setContent } = props
  useEffect(() => {
    console.log('Acom组件挂载')
    return () => {
      console.log('组件卸载')
    }
  })
  return <p>{content}</p>
}
function Effect() {
  let [content, setContent] = useState('请输入文字内容')
  let [edit, setFlag] = useState(false)
  return (
    <div>
      {!edit ? (
        <button
          onClick={() => {
            setFlag(true)
          }}
        >
          编辑
        </button>
      ) : (
        <div>
          <Acom content={content} setContent={setContent}></Acom>
          <input
            type="text"
            value={content}
            onChange={(e) => {
              setContent(e.target.value)
            }}
            onBlur={() => {
              setFlag(false)
            }}
          />
        </div>
      )}
    </div>
  )
}
export default Effect
