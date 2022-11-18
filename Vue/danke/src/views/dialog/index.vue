<template>
  <div>
    <el-button @click="open">按钮</el-button>
    <el-button @click="request">点击发起请求</el-button>
    <el-dialog
      title="提示"
      :visible.sync="visible"
      width="30%"
      :destroy-on-close="true"
    >
      <span>这是一段信息</span>
      <TEST />
    </el-dialog>
  </div>
</template>

<script>
const delay = function (inteval) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(inteval)
    }, inteval)
  })
}
let tasks = [
  () => delay(1000),
  () => delay(1002),
  () => delay(1001),
  () => delay(1003),
  () => delay(1004),
  () => delay(1006)
]
function createRequest(tasks, pool, callback) {
  // 1.不传pool，传了回调函数
  if (typeof pool !== 'function') {
    callback = pool
    pool = 5
  }
  // 2.第二个参数不是数字，则pool为5
  if (typeof pool !== 'number') pool = 5
  // 3.不传回调函数
  if (typeof pool !== 'function') callback = function () {}

  /* 
        补量执行，没时间片就挂起，有时间片就调用
      */

  class TaskQueue {
    // 正在执行的任务
    running = 0
    queue = []
    results = []

    pushTask(task) {
      let self = this
      self.queue.push(task)
      self.next()
    }
    next() {
      let self = this
      while (self.running < pool && self.queue.length > 0) {
        self.running++
        let task = self.queue.shift()
        task()
          .then((res) => {
            self.results.push(res)
          })
          .finally(() => {
            self.running--
            self.next()
          })
      }
      if (self.running === 0) callback(self.results)
    }
  }
  let tq = new TaskQueue()
  tasks.forEach((task) => tq.pushTask(task))
}

export default {
  name: 'dic',
  data() {
    return {
      visible: false
    }
  },
  methods: {
    open() {
      this.visible = true
    },
    request() {
      //触发请求
      createRequest(tasks, 2, (res) => {
        console.log(res)
      })
    }
  },
  components: {
    TEST: () => import('@/views/dialog/TEST.vue')
  }
}
</script>

<style>
</style>