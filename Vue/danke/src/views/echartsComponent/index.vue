<template lang="pug">
.xigua
  .bar-chart(ref='box')
  .bar-chart(ref='box1')
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
  computed: {
    option1() {
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
                formatter: function () {
                  return '预警线'
                }
              }
            }
          ]
        ]
      }
      return {
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
            data: d1,
            test: [
              {
                name: '预警线',
                type: 'warn',
                position: '30-40'
              },
              {
                name: '观察线',
                type: 'observe',
                position: '60-70'
              }
            ]
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
          }
        ]
      }
    },
    option2() {
      const colors = ['#5470C6', '#91CC75', '#EE6666']
      return {
        color: colors,
        tooltip: {
          trigger: 'axis'
          // axisPointer: {
          //   type: 'cross'
          // }
        },
        grid: {
          right: '20%'
        },
        // toolbox: {
        //   feature: {
        //     dataView: { show: true, readOnly: false },
        //     restore: { show: true },
        //     saveAsImage: { show: true }
        //   }
        // },
        legend: {
          data: ['Evaporation', 'Temperature']
        },
        dataZoom: {
          type: 'slider',
          height: 8
        },
        xAxis: [
          {
            type: 'category',
            axisTick: {
              alignWithLabel: true
            },
            // prettier-ignore
            data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug']
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: 'Evaporation',
            position: 'right',
            alignTicks: true,
            axisLine: {
              show: true,
              lineStyle: {
                color: colors[0]
              }
            },
            axisLabel: {
              formatter: '{value} ml'
            },
            //分割线
            splitLine: {
              show: true,
              lineStyle: {
                color: 'blue',
                type: 'dashed'
              }
            }
          },
          {
            type: 'value',
            name: '温度',
            position: 'left',
            alignTicks: true,
            axisLine: {
              show: true,
              lineStyle: {
                color: colors[1]
              }
            },
            axisLabel: {
              formatter: '{value} °C'
            },
            //分割线
            splitLine: {
              show: !!1,
              lineStyle: {
                color: 'red',
                type: 'dashed'
              }
            }
          }
        ],
        series: [
          {
            name: 'Evaporation',
            type: 'bar',
            data: [11, 22, 33, 66, 33, 99, 10, 10]
          },

          {
            name: 'Temperature',
            type: 'line',
            yAxisIndex: 1,
            data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4]
          }
        ]
      }
    }
  },
  methods: {
    init(container, option, chartName) {
      this[chartName] = echarts.init(container)
      this[chartName] && this[chartName].setOption(option, true)
    }
  },
  mounted() {
    this.init(this.$refs.box, this.option1, 'chart1')
    this.init(this.$refs.box1, this.option2, 'chart2')
    window.addEventListener(
      'resize',
      debounce(() => {
        // console.log(this.chart.getWidth())
        console.log(this.$refs.box.clientWidth)
        // let w = this.chart.getWidth()
        let w = this.$refs.box.clientWidth
        let x = ((w * 0.8) / 6) * 2 + 20 + w * 0.1
        let op = this.chart1.getOption()
        op.color = ['#bfc', '#bfb']
        op.series[0].markLine.data[0][0].x = x
        op.series[0].markLine.data[0][1].x = x
        // console.log(op)
        this.chart1.setOption(op, true)
        this.chart1 && this.chart1.resize()
        this.chart2 && this.chart2.resize()
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
  margin-bottom: 10px;
}
</style>
