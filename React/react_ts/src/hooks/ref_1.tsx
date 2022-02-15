import { useState, useEffect, useRef } from 'react'
/**
 * 在这里可以结合useEffect实现新值和旧值的对比
 * @returns 
 */
function Ref() {
  let [count, setCount] = useState(0)
  let prev = useRef(count)
  useEffect(() => {
    //副作用是在组件有更新的时候才会触发，所以这里的count是更新的时候的值
    prev.current = count
  })
  return (
    <div>
      <p>当前值:{count}</p>
      <p>旧值:{prev.current}</p>
      <button onClick={() => setCount(count + 1)}>点击+1</button>
    </div>
  )
}
export default Ref
