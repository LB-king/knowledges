import { useState, useEffect, useRef } from 'react'
/**
 * 副作用  组件挂载完毕，组件更新完成， 组件即将卸载
 */
interface AInterface {
  content: string
  setContent: Function
  setFlag: Function
}
/**
 * 实现内容很多出现滚动条的时候，input输入框始终出现在页面的顶部
 * @param props
 * @returns
 */
function Input(props: AInterface) {
  let { content, setContent, setFlag } = props
  let Iref: HTMLElement | any = useRef(null)
  function toScroll() {
    // let tBox = document.getElementById('text')
    let tBox: HTMLElement | any = Iref.current
    if (!tBox) return
    //窗口滚动的高度
    let y = window.scrollY
    //输入框距离文档顶部的距离
    let tTop = tBox.offsetTop
    if (y >= tTop) tBox.style.transform = `translateY(${y - tTop}px)`
  }
  useEffect(() => {
    //返回的回调相当于componentWillUnmount
    //默认获取输入框的焦点
    // Iref.current && Iref.current?.select()
    Iref.current && Iref.current?.focus()
    document.addEventListener('scroll', toScroll)
    return () => {
      document.removeEventListener('scroll', () => {})
    }
  }, []) //指定的是[],回调函数只在第一次render的时候执行,也可以指定content，仅在 content 更改时更新
  return (
    <input
      type="text"
      value={content}
      id="text"
      ref={Iref}
      onChange={(e) => {
        setContent(e.target.value)
      }}
      onBlur={() => {
        setFlag(false)
      }}
    />
  )
}
function Ref() {
  let [content, setContent] = useState('请输入文字内容')
  let [edit, setFlag] = useState(false)
  return (
    <div>
      <p>{content}</p>
      {!edit ? (
        <button
          onClick={() => {
            setFlag(true)
          }}
        >
          编辑
        </button>
      ) : (
        <Input
          content={content}
          setContent={setContent}
          setFlag={setFlag}
        ></Input>
      )}
      {[...'.'.repeat(100)].map((_, index) => {
        return <p key={index}>段落内容{index}</p>
      })}
    </div>
  )
}
export default Ref
