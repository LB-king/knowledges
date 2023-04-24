<template lang="pug">
.home
  | 首页
  p.item(v-for='(item, index) in objList')
    | {{ index }}--{{ item }}
  el-button(@click='click') 按钮
  input(type='text', v-if='show', key='t1')
  input(type='text', v-else, key='t2')
  el-table(:data='tableData', border, :span-method='arraySpanMethod')
    el-table-column(type='index')
    el-table-column(label='名字', prop='name')
    el-table-column(label='价格', prop='price')
  hr
  table(border, cellspacing='0')
    tr
      th 名字
      th 年龄
      th 性别
    tr
      td(rowSpan='2') 111
      td 12
      td man
    tr
      td 222
      td woman
  hr
  el-form(:model='info')
    el-form-item 
      el-input(v-model='info.name')
      p#show {{ info.name }}
  p {{ name }}
  el-button.xxx(type="primary") 自定义的按钮
</template>

<script>
// @ is an alias to /src
// v-for 可以循环数组以及对象
import mix1 from './mix1.js'
import mix2 from './mix2.js'
import axios from 'axios'
export default {
  name: 'Home',
  data() {
    return {
      name: '组件内部的name',
      list: ['AA', 'BB', 'CC'],
      objList: {
        name: 'KO',
        age: 35
      },
      info: { name: '' },
      show: true,
      tableData: [
        { id: '000', name: 'HTML', price: 0 },
        { id: 111, name: 'HTML', price: 11 },
        { id: 222, name: 'HTML', price: 22 },
        { id: 333, name: 'JS', price: 33 },
        { id: 444, name: 'JS', price: 44 },
        { id: 555, name: 'CSS', price: 55 },
        { id: 666, name: 'CSS', price: 66 },
        { id: 666, name: 'CSS', price: 77 }
      ],
      merge: [], //存放需要合并的行
      pos: '', //需要合并行下标
      apanArr: [],
      pos: 0
    }
  },
  mixins: [mix1, mix2],
  components: {},
  computed: {
    nTableData() {
      let names = this.tableData.map(item => item.name)
      return Array.from(new Set(names))
    }
  },
  methods: {
    getSpanArr(data, propName) {
      let merge = [],
        pos = 0
      for (var i = 0; i < data.length; i++) {
        if (i === 0) {
          merge.push(1)
          pos = 0
        } else {
          // 判断当前元素与上一个元素是否相同
          //根据相同id进行合并,根据需要可进行修改
          if (data[i][propName] === data[i - 1][propName]) {
            merge[pos] += 1
            merge.push(0)
          } else {
            merge.push(1)
            pos = i
          }
        }
      }
      return merge
    },
    // row:行 colunm:列 行索引:rowIndex 列索引:columnIndex
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      //要合并的列
      if (columnIndex === 1) {
        //this.merge=>[3, 0, 0, 2, 0, 3, 0, 0]
        let merge = this.getSpanArr(this.tableData, 'name')
        const _row = merge[rowIndex] //合并的行数
        const _col = _row > 0 ? 1 : 0 //行数有值的话，列也保留，否则也不显示列
        console.log('_row', _row, '_col', _col)
        return {
          rowspan: _row,
          colspan: _col
        }
      }
    },
    click() {
      this.show = !this.show
      axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8'
      // axios.defaults.withCredentials = true
      // axios.defaults.crossDomain = true
      // axios.defaults.headers.post['Content-Type'] =
      //   'application/x-www-form-urlencoded'
      var p = {
        name: 'admin',
        password: '123456'
      }
      axios({
        url: 'http://127.0.0.1:3000/login',
        method: 'post',
        // data: JSON.stringify(p)
        data: p
      })
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    }
    // say() {
    //   console.log('组件中的name', this.name);
    // }
  },
  mounted() {
    // console.log(this.name)
    this.say()
  }
}
</script>
<style lang="less">
@import url('~@/views/test.less');
@primary-color: #bfc;
.xxx.el-button--primary {
  color: @test-color;
}
</style>