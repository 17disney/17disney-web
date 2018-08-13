<template>
  <charts :height="height" :options="options" :id="id"></charts>
</template>

<script>
/*
+-----------------------------------------------------------------------------------------------------------------------
| Author: xank <xank@qq.com>  Blog：https://www.xank.cn
+-----------------------------------------------------------------------------------------------------------------------
| week-att-charts
| 乐园项目等候排名
*/

import echarts from 'echarts'
import Color from 'pkg/17disney-common/const/color'
import Charts from './Charts'
import moment from 'moment'
import { markMax, compare } from '@/utils/array'

const NAME = 'week-att-charts'

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
      height: 350,
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
      if (!data || data.length === 0) return

      const waitMax = data.map(_ => _.waitMax)
      const XMax = markMax(waitMax, 60, 0)

      const options = {
        grid: {
          top: 50,
          left: 66,
          right: 90,
          bottom: 60
        },
        xAxis: {
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: Color.colorPrimary
            }
          },
          axisLabel: {
            fontSize: 11
          },
          type: 'category',
          // boundaryGap: false,
          data: data.map(_ => _.dateView)
        },
        yAxis: {
          splitLine: {
            // show: false
          },
          interval: 60,
          type: 'value',
          axisTick: { // 刻度粗线
            show: false,
            inside: true
          },
          max: XMax,
          axisLine: {
            symbol: ['none', 'arrow'],
            lineStyle: {
              color: Color.colorPrimary
            }
          },
          splitNumber: 4,
          axisLabel: {
            formatter: ' {value} 分钟',
            showMinLabel: false,
            verticalAlign: 'top',
            margin: 10,
            padding: [-5, 0, 5, 0]
          }
        },
        legend: {
          right: 0,
          bottom: 0,
          data: [
            {
              name: '平均等候',
              icon: 'roundRect'
            },
            {
              name: '最大等候',
              icon: 'roundRect'
            }
          ],
          textStyle: {
            color: Color.colorLightGrey
          }
        },
        tooltip: {
          trigger: 'axis',
        },
        series: [
          {
            name: '最大等候',
            type: 'bar',
            barWidth: 18,
            barGap: '-100%',
            smooth: true,
            showSymbol: false,
            itemStyle: {
              color: Color.colorPick,
              opacity: 0.5
            },
            data: data.map(_ => _.waitMax),
            label: {
              show: true,
              fontSize: 13,
              position: 'top'
              // offset: [0, -2]
            }
          },
          // {
          //   name: '最大等候',
          //   type: 'line',
          //   smooth: false,
          //   showSymbol: true,
          //   symbolSize: 8,
          //   itemStyle: {
          //     color: Color.colorPick
          //   },
          //   lineStyle: {
          //     type: 'dashed'
          //   },
          //   data: data.map(_ => _.waitMax),
          // },
          {
            name: '平均等候',
            type: 'bar',
            barWidth: 18,
            smooth: true,
            showSymbol: false,
            itemStyle: {
              color: Color.colorPrimary,
            },
            data: data.map(_ => _.waitAvg),

            markLine: {
              symbolSize: [8, 8],
              symbol: ['circle', 'circle'],
              label: {
                show: true,
                position: 'end',
                formatter: params => {
                  const { name, value } = params
                  return `${name} ${value.toFixed(0)} 分钟`
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
                // { type: 'average', name: '平均' },
                { type: 'max', name: '最长' },
                { type: 'min', name: '最短' }
              ]
            }

          },
          {
            name: '平均等候',
            type: 'line',
            smooth: false,
            showSymbol: true,
            symbolSize: 6,
            itemStyle: {
              color: Color.colorPrimary,
            },
            lineStyle: {
              type: 'dashed'
            },
            data: data.map(_ => _.waitAvg)
          }
        ]
      };

      this.options = options
    }
  }
}
</script>
