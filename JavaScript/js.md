### ES6的一些方法（不分先后）

- ```javascript
  import * as xxx from 'xxx' // 会将'xxx'中所有export导出的内容组合成一个对象返回
  import * as obj from 'xxx' // 这种写法表示把所有的输出包裹到obj对象里
  ```

### JavaScript方法积累

- 上传读取txt文件内容

  ```javascript
  let reader = new FileReader()
  reader.readAsText(file)
  // 这个方法是异步的，只有执行完成后才能查看到结果，直接查看是无结果的，并返回undefined
  // 所以要挂载到实例的onload或onloadend的方法处理转化后的结果
  reader.onload = e => {
    let content = e.target.result
    let arr = content.split('\r') //string到array时用'\r'
    let res = arr.filter(item => item !== '\n') //内容过滤换行用'\n'
  }
  ```

  
