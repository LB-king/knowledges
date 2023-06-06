<template>
  <div class="mars-pro">
    <pro-layout-contaner :columnCount="1" :span="12"> </pro-layout-contaner>
    <div id="container" class="container" v-loading="loading"></div>
  </div>
</template>
  
  <script>
import createState from 'mars-pro/lib/pro/createState'
import { objectProperty } from 'mars-pro/lib/pro/util'
import G6, {
  Util,
  registerNode,
  registerEdge,
  TreeGraph,
  Marker,
  registerBehavior
} from '@antv/g6'
import treeData from './tree.data'
/**
 * format the string
 * @param {string} str The origin string
 * @param {number} maxWidth max width
 * @param {number} fontSize font size
 * @return {string} the processed result
 */
const fittingString = (str, maxWidth, fontSize) => {
  const ellipsis = '...'
  const ellipsisLength = Util.getTextSize(ellipsis, fontSize)[0]
  let currentWidth = 0
  let res = str
  const pattern = new RegExp('[\u4E00-\u9FA5]+') // distinguish the Chinese charactors and letters
  str.split('').forEach((letter, i) => {
    if (currentWidth > maxWidth - ellipsisLength) return
    if (pattern.test(letter)) {
      // Chinese charactors
      currentWidth += fontSize
    } else {
      // get the width of single letter according to the fontSize
      currentWidth += Util.getLetterWidth(letter, fontSize)
    }
    if (currentWidth > maxWidth - ellipsisLength) {
      res = `${str.substr(0, i)}${ellipsis}`
    }
  })
  return {
    text: res,
    isMax: currentWidth > maxWidth - ellipsisLength
  }
}
export default {
  name: 'mars',
  props: {
    ppp: {
      type: String,
      default: 'pp'
    }
  },
  data() {
    return {
      form: { info: {} },
      iName: '',
      treeData,
      graph: null,
      loading: false
    }
  },
  methods: {
    //初始化树
    initTree() {
      let _this = this
      console.log('UI_LOG: ', '开始初始化~')
      let container = document.querySelector('#container')
      let { clientWidth: width, clientHeight: height } = container

      // console.log('UI_LOG: ', Util.getLetterWidth('号哈哈哈哈', 16))
      // console.log('UI_LOG: ', Util.getTextSize('号哈哈哈哈', 12)[0])
      //根节点
      registerNode('root-node', {
        draw(cfg, group) {
          const size = [100, 40]
          const width = Util.getTextSize(cfg.name, 18)[0] + 10
          const keyShape = group.addShape('rect', {
            attrs: {
              width,
              height: size[1],
              fill: 'rgba(0, 83, 255, 1)',
              radius: 0,
              label: cfg.name,
              labelCfg: {
                style: {
                  fontSize: 18,
                  color: '#fff'
                }
              },
              x: -width / 2,
              y: -size[1] / 2
            },
            name: 'root-rectshape'
          })
          group.addShape('text', {
            attrs: {
              text: cfg.name,
              fontSize: 18,
              textAlign: 'center',
              textBaseline: 'middle',
              fill: '#fff',
              cursor: 'pointer'
            },
            name: 'root-label'
          })
          group.addShape('text', {
            attrs: {
              text: `企业数量：${cfg.count}家`,
              fontSize: 10,
              textAlign: 'center',
              fill: 'rgba(102, 102, 102, 1)',
              y: 34
            },
            name: 'root-count'
          })
          return keyShape
        }
      })
      //非根节点的第一层节点
      registerNode('level1-node', {
        draw(cfg, group) {
          const size = [100, 30]
          const keyShape = group.addShape('rect', {
            attrs: {
              width: size[0],
              height: size[1],
              radius: 0,
              fill: 'rgba(255, 255, 255, 1)',
              stroke: 'rgba(0, 83, 255, 1)',
              x: -size[0] / 2,
              y: -size[1] / 2
            },
            name: 'root-rectshape'
          })
          group.addShape('text', {
            attrs: {
              text: cfg.name,
              fontSize: 10,
              textAlign: 'right',
              textBaseline: 'middle',
              fill: 'rgba(51, 51, 51, 1)'
            },
            name: 'level1-label'
          })
          group.addShape('text', {
            attrs: {
              text: `(${cfg.count}家企业)`,
              fontSize: 8,
              textAlign: 'left',
              textBaseline: 'middle',
              fill: 'rgba(153, 153, 153, 1)'
            },
            name: 'level1-count'
          })
          group.addShape('text', {
            attrs: {
              text: `成本占比(${cfg.rate})`,
              fontSize: 8,
              textAlign: 'center',
              y: 26,
              fill: 'rgba(153, 153, 153, 1)'
            },
            name: 'level1-count'
          })
          return keyShape
        }
      })
      //其他类型的节点
      registerNode('other-node', {
        draw(cfg, group) {
          const size = [100, 30]
          const subText = `(${cfg.count || ''}家企业)`
          const width = 110
          // const width = Util.getTextSize(cfg.name, 10)[0] + Util.getTextSize(subText, 8)[0] + 12
          const keyShape = group.addShape('rect', {
            attrs: {
              width,
              height: size[1],
              radius: 0,
              fill: 'rgba(255, 255, 255, 1)',
              stroke: 'rgba(0, 83, 255, 1)',
              x: -width / 2,
              y: -size[1] / 2
            },
            name: 'root-rectshape'
          })
          group.addShape('text', {
            attrs: {
              text: fittingString(cfg.name, 100, 10).text,
              fontSize: 10,
              // textAlign: 'right',
              x: -width / 2 + 6,
              textBaseline: 'middle',
              fill: 'rgba(51, 51, 51, 1)'
            },
            name: 'othet-node-name'
          })
          group.addShape('text', {
            attrs: {
              text: fittingString(cfg.name, 100, 10).isMax
                ? ''
                : fittingString(subText, 95 - cfg.name.length * 10, 8).text,
              fontSize: 8,
              // textAlign: 'left',
              x: -width / 2 + 8 + Util.getTextSize(cfg.name, 10)[0],
              textBaseline: 'middle',
              fill: 'rgba(153, 153, 153, 1)'
            },
            name: 'level1-count'
          })
          const bottomText = `成本占比(${cfg.rate || ''})`
          group.addShape('text', {
            attrs: {
              text: bottomText,
              fontSize: 8,
              textAlign: 'center',
              // x: -Util.getTextSize(bottomText, 8)[0] / 2,
              y: 26,
              fill: 'rgba(153, 153, 153, 1)'
            },
            name: 'level1-count'
          })
          const defaultAttrs = {
            stroke: 'rgba(0, 83, 255, 1)',
            fill: '#fff',
            lineWidth: 1,
            cursor: 'pointer',
            y: 0,
            r: 6
          }

          if (cfg.children && cfg.children.length > 0) {
            if (cfg.state === 'left') {
              group.addShape('marker', {
                attrs: {
                  ...defaultAttrs,
                  symbol: cfg.collapsed ? Marker.expand : Marker.collapse,
                  x: -width / 2 - 6
                },
                name: 'collapse-icon'
              })
            } else {
              group.addShape('marker', {
                attrs: {
                  ...defaultAttrs,
                  symbol: cfg.collapsed ? Marker.expand : Marker.collapse,
                  x: width / 2 + 6
                },
                name: 'collapse-icon'
              })
            }
          } else {
            if (cfg.state === 'left') {
              group.addShape('marker', {
                attrs: {
                  ...defaultAttrs,
                  symbol: Marker.expand,
                  x: -width / 2 - 6
                },
                name: 'collapse-icon'
              })
            } else {
              group.addShape('marker', {
                attrs: {
                  ...defaultAttrs,
                  symbol: Marker.expand,
                  x: width / 2 + 6
                },
                name: 'collapse-icon'
              })
            }
          }
          return keyShape
        },
        setState(name, value, item) {
          // if (name === 'collapsed') {
          //   let models = item.getModel()
          //   if (!models.children) {
          //     //这里要请求接口
          //     // _this.$set(models, 'children', [])
          //     models.children = []
          //     models.children.push({
          //       id: 'xxx',
          //       name: 'xxx',
          //       state: item.state
          //     })
          //     const marker = item
          //       .get('group')
          //       .find(ele => ele.get('name') === 'collapse-icon')
          //     marker.attr('symbol', Marker.upTriangle)
          //     _this.graph.updateChild(models, models.id)
          //   } else {
          //     const marker = item
          //       .get('group')
          //       .find(ele => ele.get('name') === 'collapse-icon')
          //     const icon = value ? Marker.expand : Marker.collapse
          //     marker.attr('symbol', icon)
          //   }
          // }
        }
      })

      //自定义边
      registerEdge('tree-line', {
        draw(cfg, group) {
          const startPoint = cfg.startPoint
          const endPoint = cfg.endPoint

          const path = [
            ['M', startPoint.x, startPoint.y],
            ['L', endPoint.x / 3 + (2 / 3) * startPoint.x, startPoint.y],
            ['L', endPoint.x / 3 + (2 / 3) * startPoint.x, endPoint.y],
            ['L', endPoint.x, endPoint.y]
          ]
          const shape = group.addShape('path', {
            attrs: {
              stroke: 'rgba(43, 111, 253, 1)',
              // stroke: 'rgba(100, 100, 100, 1)',
              path
            },
            name: 'path-shape'
          })
          return shape
        }
      })

      let graph = (this.graph = new TreeGraph({
        container,
        width,
        height,
        modes: {
          default: [
            {
              // type: 'collapse-expand',
              // onChange: function onChange(item, collapsed) {
              //   const data = item.get('model')
              //   data.collapsed = collapsed
              //   return false
              // }
            },
            {
              type: 'tooltip',
              formatText: function formatText(model) {
                var text = `${model.name || ''}  (${model.count || ''}家企业)`

                return text
              },

              shouldUpdate: function shouldUpdate(e) {
                const model = e.item.getModel()
                const subText = `(${model.count || ''}家企业)`
                if (model.level === 0) return false
                if (
                  fittingString(model.name, 100, 10).isMax ||
                  fittingString(subText, 95 - model.name.length * 10, 8).isMax
                ) {
                  return true
                }
                return false
              }
            },
            'drag-canvas',
            'zoom-canvas'
          ]
        },
        //默认节点属性
        defaultNode: {
          type: 'rect',
          style: {
            width: 100,
            height: 30
          },
          draggable: true
        },
        //默认连线节点
        defaultEdge: {
          type: 'tree-line'
        },
        layout: {
          type: 'mindmap',
          direction: 'H',
          getHeight: () => 16,
          getWidth: () => 30,
          getVGap: () => 30,
          getHGap: () => 80,
          getSide: node => {
            return node.data.state === 'left' ? 'left' : 'right'
          }
        }
      }))

      graph.on('node:click', ev => {
        // let symbolName = objectProperty(ev, 'target.cfg.name', '')
        const { item, target } = ev
        const name = target.get('name')
        if ('collapse-icon' === name) {
          let model = item.getModel()
          if (model.collapsed === undefined) {
            model.collapsed = false
          }

          //没有子节点
          if (
            !model.children ||
            (model.children && model.children.length === 0)
          ) {
            console.log('UI_LOG: ', '没有子节点,发请求了')
            this.loading = true
            //获取父节点的方向
            const state = item._cfg.parent.getModel().state || model.state
            setTimeout(() => {
              let children = []
              children.push({
                id: `k-${Math.random()}`,
                name: `k-${Math.random()}`,
                state
              })

              model.children = children
              Util.traverseTree(model, subtree => {
                subtree.type = 'other-node'
              })
              // graph.updateChildren(children, model.id)
              graph.updateChild(model, model.id)

              const marker = item
                .get('group')
                .find(ele => ele.get('name') === 'collapse-icon')
              marker.attr('symbol', Marker.collapse)
              _this.loading = false
              // console.log('UI_LOG: ', graph.cfg.data.children)

              // graph.render()
              // graph.fitCenter()
            }, 502)
          } else {
            console.log('UI_LOG: ', model)
            model.collapsed = !model.collapsed
            graph.updateChild(model, model.id)
            // console.log('UI_LOG: ', graph.cfg.data.children)
          }
          // model.collapsed = !model.collapsed
          // graph.setItemState(ev.item, 'collapsed', ev.item.getModel().collapsed)
          // graph.layout()
        }
      })

      graph.node(node => {
        return {
          label: node.name || '',
          anchorPoints: [
            [0, 0.5],
            [1, 0.5]
          ]
        }
      })

      Util.traverseTree(this.treeData, subtree => {
        if (subtree.level === undefined) subtree.level = 0
        subtree.children?.forEach(child => (child.level = subtree.level + 1))
        switch (subtree.level) {
          case 0:
            subtree.type = 'root-node'
            break
          // case 1:
          //   subtree.type = 'level1-node'
          //   break
          default:
            subtree.type = 'other-node'
        }
      })
      graph.data(this.treeData)
      graph.render()
      graph.fitView()
      // graph.zoom(0.5, { x: width, y: height})
    }
  },
  mounted() {
    // this.init(this.treeData)
    this.initTree(this.treeData)
  }
}
</script>
  
  
  <style lang="scss">
.container {
  height: 700px;
  border: 1px solid #f8f8f8;
  width: 80%;
  margin: 0 auto;
  border: 1px solid #ccc;
  background-color: #e4dad597;
  .g6-tooltip {
    border: 1px solid #e2e2e2;
    border-radius: 4px;
    font-size: 12px;
    color: #545454;
    background-color: rgba(255, 255, 255, 0.9);
    padding: 10px 8px;
    box-shadow: rgb(174, 174, 174) 0px 0px 10px;
    margin-left: 150px;
    margin-top: 30px;
    width: 200px;
    word-wrap: break-word;
  }
}
</style>
  