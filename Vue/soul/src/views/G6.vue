<template>
  <div class="main" ref="g6main" id="g6main"></div>
</template>

<script>
import G6 from '@antv/g6'
import Hierarchy from '@antv/hierarchy'

// 默认连线的样式
export default {
  name: 'g6-container',
  data() {
    return {
      treeData: {
        id: '001',
        label: '数据导航',
        children: [
          {
            id: '001-1',
            label: '贴源层',
            collapse: false,
            children: [
              {
                id: '001-1-1',
                label: '司法数据',
                children: []
              },
              {
                id: '001-1-2',
                label: '工商数据',
                children: []
              }
            ]
          },
          {
            id: '001-02',
            label: '基础层',
            children: []
          },
          {
            id: '001-03',
            label: '指标层',
            children: []
          },
          {
            id: '001-04',
            label: '应用层',
            children: []
          }
        ]
      }
    }
  },
  mounted() {
    const COLLAPSE_ICON = function COLLAPSE_ICON(x, y, r) {
      return [
        ['M', x - r, y - r],
        ['a', r, r, 0, 1, 0, r * 2, 0],
        ['a', r, r, 0, 1, 0, -r * 2, 0],
        ['M', x + 2 - r, y - r],
        ['L', x + r - 2, y - r]
      ]
    }
    const EXPAND_ICON = (x, y, r) => {
      return [
        ['M', x - r, y - r],
        ['a', r, r, 0, 1, 0, r * 2, 0],
        ['a', r, r, 0, 1, 0, -r * 2, 0],
        ['M', x + 2 - r, y - r],
        ['L', x + r - 2, y - r],
        ['M', x, y - 2 * r + 2],
        ['L', x, y - 2]
      ]
    }

    G6.registerNode(
      'tree-node',
      {
        options: {
          size: [60, 20],
          stroke: '#91d5ff',
          fill: '#91d5ff'
        },
        draw(cfg, group) {
          const styles = this.getShapeStyle(cfg)
          const { labelCfg = {} } = cfg

          const keyShape = group.addShape('rect', {
            attrs: {
              ...styles,
              cursor: 'pointer',
              x: 0,
              y: 0
            }
          })
          // 如果不需要动态增加或删除元素，则不需要 add 这两个 marker
          group.addShape('marker', {
            attrs: {
              x: 60,
              y: 52,
              r: cfg.children.length > 0 ? 6 : 0,
              // stroke: '#73d13d',
              stroke: '#73d13d',
              cursor: 'pointer',
              // symbol: EXPAND_ICON
              symbol: cfg.children.length > 0 ? COLLAPSE_ICON : ""
            },
            name: 'add-item'
          })

          // group.addShape('marker', {
          //   attrs: {
          //     x: 80,
          //     y: 52,
          //     r: 6,
          //     stroke: '#ff4d4f',
          //     cursor: 'pointer',
          //     symbol: COLLAPSE_ICON
          //   },
          //   name: 'remove-item'
          // })

          if (cfg.label) {
            group.addShape('text', {
              attrs: {
                ...labelCfg.style,
                text: cfg.label,
                x: 35,
                y: 25
              }
            })
          }

          return keyShape
        }
      },
      'rect'
    )

    G6.registerEdge('flow-line', {
      draw(cfg, group) {
        const startPoint = cfg.startPoint
        const endPoint = cfg.endPoint

        const { style } = cfg
        const shape = group.addShape('path', {
          attrs: {
            stroke: style.stroke,
            endArrow: style.endArrow,
            path: [
              ['M', startPoint.x, startPoint.y + 32],
              ['L', startPoint.x, (startPoint.y + endPoint.y) / 2],
              ['L', endPoint.x, (startPoint.y + endPoint.y) / 2],
              ['L', endPoint.x, endPoint.y]
            ]
          }
        })

        return shape
      }
    })

    const defaultStateStyles = {
      hover: {
        stroke: '#1890ff',
        lineWidth: 2
      }
    }

    const defaultNodeStyle = {
      fill: '#91d5ff',
      stroke: '#40a9ff',
      radius: 5
    }

    const defaultEdgeStyle = {
      stroke: '#91d5ff',
      endArrow: {
        path: 'M 0,0 L 12, 6 L 9,0 L 12, -6 Z',
        fill: '#91d5ff',
        d: -20
      }
    }

    const defaultLayout = {
      type: 'compactBox',
      direction: 'TB',
      getId: function getId(d) {
        return d.id
      },
      getHeight: function getHeight() {
        return 16
      },
      getWidth: function getWidth() {
        return 16
      },
      getVGap: function getVGap() {
        return 40
      },
      getHGap: function getHGap() {
        return 70
      }
    }

    const defaultLabelCfg = {
      style: {
        fill: '#000',
        fontSize: 14
      }
    }

    const width = this.$refs.g6main.clientWidth
    const height = this.$refs.g6main.clientHeight
    let selectedItem = void 0;

    const graph = new G6.TreeGraph({
      container: 'g6main',
      width,
      height,
      linkCenter: true,
      modes: {
        default: ['drag-canvas', 'zoom-canvas']
      },
      defaultNode: {
        type: 'tree-node',
        size: [120, 40],
        style: defaultNodeStyle,
        labelCfg: defaultLabelCfg
      },
      defaultEdge: {
        type: 'flow-line',
        style: defaultEdgeStyle
      },
      nodeStateStyles: defaultStateStyles,
      edgeStateStyles: defaultStateStyles,
      layout: defaultLayout
    })

    graph.data(this.treeData)
    graph.render()
    graph.fitView()

    graph.on('node:mouseenter', evt => {
      const { item } = evt
      graph.setItemState(item, 'hover', true)
    })

    graph.on('node:mouseleave', evt => {
      const { item } = evt
      graph.setItemState(item, 'hover', false)
    })

    graph.on('node:click', evt => {
      const { item, target } = evt
      const targetType = target.get('type')
      const name = target.get('name')

    })
  }
}
</script>

<style scoped lang="scss">
.main {
  height: 600px;
  width: 800px;
  margin: 0 auto;
  border: 1px solid #d68989;
}
</style>