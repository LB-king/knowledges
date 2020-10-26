<template>
  <div class="hierarchy-main">
    <div class="tree-conteainer" id="treeGraph" ref="treeGraph"></div>
  </div>
</template>

<script>
import { data as stockData } from '@/views/Hierarchy/data.json'
import * as d3 from 'd3'

export default {
  name: 'tree-graph',
  data() {
    return {}
  },
  methods: {
    init() {
      let _this = this
      console.log(window.getComputedStyle(this.$el))
    }
  },
  mounted() {
    this.init()
  }
}
</script>

<style lang="scss">
.hierarchy-main {
  height: 800px;
  width: 80%;
  margin: 10px auto;
  position: relative;
  background-color: #f8f8f8;
  border: 1px solid #ccc;
  .tree-conteainer {
    height: 100%;
  }
}
</style>
