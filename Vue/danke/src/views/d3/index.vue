<template>
  <div class="d3-box">
    <ul id="list">
      <li></li>
      <li></li>
    </ul>
    <p>
      <el-button @click="remove">rm</el-button>
    </p>
  </div>
</template>

<script>
import * as d3 from 'd3'
import jsonData from './data.json'
export default {
  methods: {
    remove() {
      d3.selectAll('li')
        .data([10, 20, 30, 15])
        .exit()
        .remove()
    },
    initUl() {
      d3.select('#list')
        .selectAll('li')
        .data([10, 20, 30, 25, 15])
        .text(function(d) {
          return 'This is pre-existing element and the value is ' + d
        })
        .enter()
        .append('li')
        .text(function(d) {
          return 'This is dynamically created element and the value is ' + d
        })
    }
  },
  mounted() {
    this.initUl()
  }
}
</script>

<style lang="scss">
.d3-box {
  height: 500px;
  width: 800px;
  border: 1px solid #00f;
  margin: 10px auto;
}
</style>