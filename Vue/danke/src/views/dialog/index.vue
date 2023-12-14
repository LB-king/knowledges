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

    <el-divider></el-divider>
    <!-- <TREE></TREE> -->

    <hr />
    <hr />
    <div
      class="line"
      style="
        width: 200px;
        margin-left: 20px;
        border: 1px solid #333;
        padding: 15px;
      "
    >
      <div
        v-for="(item, index) in cycles"
        :key="item.id"
        :class="'dot-' + item.status"
        class="dot-row"
      >
        <div class="item_tail"></div>
        <span class="circle">
          <i v-if="item.status === 'complete'" class="el-icon-check"></i>
          <i v-if="item.status !== 'complete'">{{ index + 1 }}</i>
        </span>
        <span class="dot-label">{{ item.label }}</span>
        <i
          class="el-icon-circle-plus-outline"
          style="cursor: pointer"
          v-if="item.status === 'doing'"
          @click="addSubItem(item)"
        >
        </i>
        <div
          class="sub-label"
          v-for="(inItem, i) in item.children"
          :key="inItem.id"
          :class="'sub-dot-' + inItem.status"
        >
          <span class="sub-circle">
            <!-- 已完成 -->
            <i v-if="inItem.status === 'complete'" class="el-icon-check"></i>
            <!-- 进行中 -->
            <i v-if="inItem.status === 'doing'"></i>
            <!-- 其他 -->
          </span>
          <span class="sub-dot-label">{{ inItem.label }}</span>
        </div>
      </div>
    </div>


    <hr />
    <hr />

    <PROCESS></PROCESS>
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
          .then(res => {
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
  tasks.forEach(task => tq.pushTask(task))
}

export default {
  name: 'dic',
  data() {
    this.con = v => {
      console.log('UI_LOG: ', v)
    }
    return {
      visible: false,
      cycles: [
        { id: 1, label: '项目立项', status: 'complete', children: [] },
        {
          id: 2,
          label: '尽职调查',
          status: 'doing',
          children: [{ id: '2-1', label: '第一次尽调', status: 'complete' }]
        },
        {
          id: 3,
          label: '备案管理',
          status: 'notStart',
          children: [{ id: '3-1', label: '第一次备案' }]
        }
      ]
    }
  },
  methods: {
    addSubItem(item) {
      console.log('UI_LOG: ', item)
      if (item.children && item.children.length > 0) {
        let len = item.children.length
        if (item.children[len - 1].status === 'doing') return
      }
      item.children.push({
        id: '2-333',
        label: '第二次尽职调查',
        status: 'doing'
      })
    },
    open() {
      this.visible = true
    },
    request() {
      //触发请求
      createRequest(tasks, 2, res => {
        console.log(res)
      })
    }
  },
  components: {
    TEST: () => import('@/views/dialog/TEST.vue'),
    TREE: () => import('@/views/dialog/ProDataTree/index.vue'),
    PROCESS: () => import('@/views/dialog/process.vue')
  }
}
</script>

<style lang="less">
.line {
  .circle {
    display: inline-block;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background-color: #f2f3f5;
    text-align: center;
    line-height: 24px;
    margin-right: 6px;
    color: #666;
  }
  .dot-row {
    padding: 8px;
    position: relative;
    .item_tail {
      width: 2px;
      height: 100%;
      background-color: #E5E6E8;
      position: absolute;
      left: 19px;
      z-index: -1;
      top: 10px;
    }
  }
  .dot-label {
    font-size: 14px;
    color: #666;
    margin-right: 8px;
  }
  .sub-label {
    padding-top: 4px;
    padding-bottom: 4px;
    padding-left: 45px;
    font-size: 12px;
    .sub-circle {
      display: inline-block;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background-color: #f2f3f5;
      margin-right: 8px;
    }
    &.sub-dot-complete {
      .sub-circle {
        color: #0052d9;
      }
    }
    &.sub-dot-doing {
      .sub-circle {
        background-color: #0052d9;
      }
    }
  }

  .dot-complete,
  .dot-doing {
    .circle {
      color: #fff;
      background-color: #0052d9;
    }
  }
  .dot-doing {
    .dot-label {
      color: #0052d9;
    }
  }
}
</style>