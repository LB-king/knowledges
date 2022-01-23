<template lang="pug">
  .xigua
    .bar-chart(ref="box")
</template>

<script>
var echarts = require('echarts')
import { debounce } from 'lodash'
var d1 = [1, 22, 15, 32, 12, 160]
var d2 = [24, 12, 14, 32, 5, 18]
var d3 = d1.map((item, index) => {
  return item + d2[index]
})
console.log(d3)
export default {
  name: 'echarts-component',
  methods: {
    init(container) {
      let markLine = {
        silent: true,
        symbol: 'none',
        lineStyle: {
          type: 'solid',
          dashOffset: 7
        },
        data: [
          [
            {
              name: '预警线',
              // x: '43%',
              // x: (80 / 19 * 4 + 10) + '%',
              xAxis: '2-3',
              y: 180
            },
            {
              // x: (80 / 19 * 4 + 10) + '%',
              xAxis: '2-3',
              y: 30,
              lineStyle: {
                color: '#E05454',
                width: 1,
                type: 'dashed'
              },
              label: {
                show: true,
                formatter: function() {
                  return '预警线'
                }
              }
            }
          ]
        ]
      }
      let option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
            shadowStyle: {
              shadowColor: '#eee'
            }
          }
        },
        color: ['#ccc', '#eee'],
        barWidth: '20',
        grid: {
          top: '10%',
          left: '10%',
          right: '10%',
          bottom: '6%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: ['1-2', '2-3', '3-4', '4-5', '5-6', '6-7'],
          axisTick: {
            alignWithLabel: false
          },
          axisLine: {
            lineStyle: {
              color: '#999'
            }
          },
          axisLabel: {
            color: '#666',
            rotate: -20,
            interval: 0,
            fontSize: 12,
            margin: 15
          },
          splitLine: {
            lineStyle: {
              color: '#EEE'
            }
          }
        },
        yAxis: [
          {
            type: 'value',
            name: '企业数(家)',
            nameTextStyle: {
              color: '#999'
            }
          }
        ],
        series: [
          // {
          //   name: '总数',
          //   type: 'bar',
          //   stack: 'total',
          //   label: {
          //     show: true,
             
          //   },
          //   emphasis: {
          //     focus: 'series'
          //   },
          //   data: d3
          // },
          {
            name: '良好',
            type: 'bar',
            stack: 'total',
            barMinHeight: 50, //设置最小的高度 防止数据过小导致的显示问题
            label: {
              show: true
            },
            emphasis: {
              // focus: 'series'
            },
            markLine,
            data: d1
          },
          {
            name: '一般',
            type: 'bar',
            stack: 'total',
            label: {
              show: true,
              position: 'top',
              color: '#bfc',
              formatter(p) {
                // console.log(p)
                return d3[p.dataIndex]
              }
            },
            emphasis: {
              focus: 'series'
            },
            data: d2
          },
          
        ]
      }
      this.chart = echarts.init(container)
      this.chart && this.chart.setOption(option, true)
    }
  },
  mounted() {
    this.init(this.$refs.box)
    window.addEventListener(
      'resize',
      debounce(() => {
        // console.log(this.chart.getWidth())
        console.log(this.$refs.box.clientWidth)
        // let w = this.chart.getWidth()
        let w = this.$refs.box.clientWidth
        let x = (w * 0.8) / 6 + 20 + w * 0.1
        let op = this.chart.getOption()
        op.color = ['#bfc', '#bfb']
        op.series[0].markLine.data[0][0].x = x
        op.series[0].markLine.data[0][1].x = x
        // console.log(op)
        this.chart.setOption(op, true)
        this.chart && this.chart.resize()
      }),
      800
    )
  }
}
</script>

<style lang="scss">
.bar-chart {
  height: 300px;
  width: 50%;
  border: 1px solid rgb(218, 233, 8);
}
</style>
