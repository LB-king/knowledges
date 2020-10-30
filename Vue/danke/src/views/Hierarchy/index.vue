<template>
  <div class="hierarchy-main">
    <div class="tree-conteainer" id="treeGraph" ref="treeGraph">
      自适应
    </div>
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
    }
  },
  mounted() {
    this.init()
  }
}
</script>

<style lang="scss">
.hierarchy-main {
  height: 300px;
  width: 30%;
  margin: 10px auto;
  font-size: 3vw;
  position: relative;
  background-color: #f8f8f8;
  border: 1px solid #ccc;
  .tree-conteainer {
    height: 100%;
  }
}
</style>
