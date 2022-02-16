import { useState, useMemo } from 'react'

function Memo() {
  let [name, setName] = useState('犀牛')
  let [age, setAge] = useState(10)
  // let isAdult = (() => {
  //   //每次都会计算一次，
  //   console.log(9)
  //   return age > 18 ? '成年' : '未成年'
  // })()
  let isAdult = useMemo(() => {
    console.log(1)
    return age > 18 ? '成年' : '未成年'
    //可以返回一个函数
    // return () => age > 18 ? '成年' : '未成年'
  }, [age <= 18])
  return (
    <div>
      <p>姓名：{name}</p>
      <p>年龄：{age}</p>
      <p>阶段：{isAdult}</p>
      <button
        onClick={() => {
          setAge((age += 2))
        }}
      >
        点击变大
      </button>
    </div>
  )
}
export default Memo
