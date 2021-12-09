/* 
  节流函数
  事件频繁触发可能造成的问题？
    + 一些浏览器事件：onresize  mousemove，触发的频率非常高，会造成页面卡顿
    + 如果要向后台发送请求，频繁触发会增加服务器的压力
  解决方案：
    + 函数节流
      - 在函数需要频繁触发时：函数执行一次后，只有大于设定的执行周期后才会执行第二次
      - 适合多次事件按时间做平均分配触发
      场景：
        + 窗口调整(resize)
        + 页面滚动(scroll)

    + 函数防抖
      - 在函数需要频繁触发时,在规定时间内，只让最后一次生效，前面的不生效
      - 适合多次事件一次响应的情况
*/

/* 
  节流函数-创建一个节流函数，在wait毫秒内最多执行callback一次
    @param
    callback 回调函数
    wait 等待时间ms
*/
function throttle(callback, wait) {
  let start = 0
  return function (e) {
    let now = Date.now()
    if (now - start >= wait) {
      callback.call(this, e)
      start = now
    }
  }
}

/* 
  函数防抖-从上一次调用后，延迟wait毫秒后调用callback
    @param
    callback 回调函数
    time 延迟时间ms
*/

function debounce(callback, time) {
  let timer = null
  //返回一个函数
  return function (e) {
    if(timer !== null) {
      clearTimeout(timer)
    }
    //启动定时器
    timer = setTimeout(() => {
      callback(this, e)
      // clearTimeout(timer) //此处可删除
    }, time)
  }
}
