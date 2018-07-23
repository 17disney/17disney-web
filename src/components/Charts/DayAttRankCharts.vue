<template>
  <charts :height="height" :options="options" :id="id"></charts>
</template>

<script>
/*
+-----------------------------------------------------------------------------------------------------------------------
| Author: xank <xank@qq.com>  Blog：https://www.xank.cn
+-----------------------------------------------------------------------------------------------------------------------
| day-att-rank-charts
| 乐园项目等候排名
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
      height: 550,
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
      const dataMax = data.map(_ => _['waitMax'])
      const dataAxis = data.map(_ => _['name'])
      const XMax = markMax(dataMax, 20, 1)

      const options = {
        grid: {
          top: 50,
          left: 180,
          right: 20,
          bottom: 60
        },
        legend: {
          right: 0,
          bottom: 0,
          // data: [
          //   {
          //     name: '客流量',
          //     icon: 'roundRect'
          //   },
          //   {
          //     name: '等候时间',
          //     icon: 'roundRect'
          //   }
          // ],
          textStyle: {
            color: Color.colorLightGrey
          }
        },
        xAxis: {
          boundaryGap: ['20%', '20%'],
          min: 0,
          max: XMax,
          axisLine: {
            symbol: ['none', 'arrow'],
            lineStyle: {
              color: Color.colorPrimary
            }
          },
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
          boundaryGap: ['20%', '20%'],
          axisLine: {
            // symbol: ['arrow', 'none'],
            lineStyle: {
              color: Color.colorPrimary
            }
          },
          data: dataAxis,
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            textStyle: {
              color: Color.colorDarkGrey
            }
          },
          inverse: true
        },
        series: [
          {
            type: 'bar',
            name: '最长等候',
            barWidth: 16,
            barGap: '-100%',
            barCategoryGap: '40%',

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
                  color: Color.colorPick,

                }
              },
              data: [
                { type: 'max', name: '最长' }
              ]
            },

            itemStyle: {
              normal: {
                barBorderRadius: 20,
                opacity: 0.5,
                color: new echarts.graphic.LinearGradient(
                  0, 0, 1, 1,
                  [
                    { offset: 0, color: Color.colorPick },
                    { offset: 1, color: Color.colorPick }
                  ]
                )
              },
            },
            data: data.map(_ => _['waitMax'])
          },

          {
            type: 'bar',
            name: '平均等候',
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
                  color: Color.colorPrimary
                }
              },
              data: [
                { type: 'average', name: '平均' },
                // { type: 'max', name: '最长' }
              ]
            },
            itemStyle: {
              normal: {
                barBorderRadius: 20,
                color: new echarts.graphic.LinearGradient(
                  0, 0, 1, 1,
                  [
                    { offset: 0, color: Color.colorPrimaryS },
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
