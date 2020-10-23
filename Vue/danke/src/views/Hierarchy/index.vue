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
      let main = this.$refs.treeGraph
      let [svgWidth, svgHeight] = [main.clientWidth, main.clientHeight]
      this.rectAngle = {
        w: 145,
        h: 68,
        intervalW: 200,
        intervalH: 150
      }
      this.layoutTree = d3
        .tree()
        .nodeSize([this.rectAngle.intervalW, this.rectAngle.intervalH])
        .separation(() => 1)
      this.svg = d3
        .select('#treeGraph')
        .append('svg')
        .attr('width', svgWidth)
        .attr('height', svgHeight)
        .attr('id', 'treeSvg')
        .call(
          d3
            .zoom()
            .scaleExtent([0.5, 2])
            .on('zoom', () => {
              this.svg.attr(
                'transform',
                d3.event.transform.translate(svgWidth / 2, svgHeight / 2)
              )
            })
        )
        .on('dblclick.zoom', null)
        .attr('style', 'position: relative; z-index: 0;')
        .append('g')
        .attr('id', 'g')
        .attr('transform', `translate(${svgWidth / 2}, ${svgHeight / 2})`)
        let upTree = stockData.children.filter(item => item.properties.direction === 'up')
        console.log(upTree)
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
