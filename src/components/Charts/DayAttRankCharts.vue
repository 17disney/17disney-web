<template>
  <charts :height="height" :options="options" :id="id"></charts>
</template>

<script>
/*
+-----------------------------------------------------------------------------------------------------------------------
| Author: xank <xank@qq.com>  Blog：https://www.xank.cn
+-----------------------------------------------------------------------------------------------------------------------
| day-att-rank-charts
| 客流量预测图表
*/

import echarts from 'echarts'
import Color from 'package/17disney-common/const/color'
import Charts from './Charts'
import moment from 'moment'
import { markMax, compare } from '@/utils/array'

const NAME = 'day-att-rank-charts'

export default {
  name: NAME,

  components: {
    Charts
  },

  props: {
    id: {
      type: String,
      default: NAME
    },
    data: Array
  },

  data() {
    return {
      height: 470,
      options: null
    }
  },

  mounted() {
    this.init()
  },

  watch: {
    'data': function (val) {
      this.init()
    }
  },

  methods: {
    init() {
      let { data } = this
      if (!data) return

      let _data = data.map(_ => _['waitAvg'])


      const XMax = markMax(_data, 10)

      const dataAxis = data.map(_ => _['name'])

      var dataShadow = [];

      // 背景层
      for (var i = 0; i < _data.length; i++) {
        dataShadow.push(XMax)
      }

      const options = {
        grid: {
          top: 50,
          left: 150,
          right: 20,
          bottom: 20
        },

        xAxis: {
          splitLine: {
            show: false
          },
          axisLabel: {
            formatter: function (value, index) {
              return value + "''"
            }
          }
        },
        yAxis: {
          data: dataAxis,
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            textStyle: {
              color: '#999'
            }
          },
          inverse: true
        },
        series: [
          {
            type: 'bar',
            barWidth: 16,
            markLine: {
              symbolSize: [8, 8],
              symbol: ['circle', 'circle'],
              label: {
                position: 'start',
                formatter: function (params) {
                  const { value, name } = params.data
                  return `${name} ${parseInt(value)} 分钟`
                }
              },
              lineStyle: {
                normal: {
                  barBorderRadius: 5,
                  type: 'dashed',
                  color: Color.colorPick
                }
              },
              data: [
                { type: 'average', name: '平均' },
                { type: 'max', name: '最长' }
              ]
            },
            itemStyle: {
              normal: {
                barBorderRadius: 20,
                color: new echarts.graphic.LinearGradient(
                  0, 0, 1, 1,
                  [
                    { offset: 0, color: Color.colorPrimaryS },
                    // { offset: 0.5, color: '#188df0' },
                    { offset: 1, color: Color.colorPrimary }
                  ]
                )
              },
            },
            data: _data
          }
        ]
      };


      this.options = options
    }
  }
}
</script>
