<template>
  <div class="hierarchy-main">
    <div class="tree-conteainer" id="treeGraph" ref="treeGraph">
      
    </div>
  </div>
</template>

<script>
import { data as treeData } from '@/views/Hierarchy/data.json'
import * as d3 from 'd3'

export default {
  name: 'tree-graph',
  data() {
    return {}
  },
  methods: {
    init() {
      let _this = this
      // 画布的宽度、长度
      let svgW = this.$refs.treeGraph.clientWidth
      let svgH = this.$refs.treeGraph.clientHeight
      this.rect = {
        w: 145,
        h: 68,
        intervalW: 200,
        intervalH: 150
      }
      this.layoutTree = d3.tree().nodeSize([this.rect.intervalW, this.rect.intervalH]).separation(() => 1)
      this.svg = d3.select('#treeGraph')
        .append('svg')
        .attr('width', svgW)
        .attr('height', svgH)
        .append('g')
        .attr(`transform`, `translate(20, 30)`)
      let [upTree, downTree] = [null, null]
      console.log(Object.keys(treeData))
    }
  },
  mounted() {
    this.init()
  }
}
</script>

<style lang="scss">
.hierarchy-main {
  height: 640px;
  width: 90%;
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
