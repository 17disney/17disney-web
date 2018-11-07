<template>
  <charts :height="height" :options="options" :id="id"></charts>
</template>

<script>
/*
+-----------------------------------------------------------------------------------------------------------------------
| Author: 17disney <616@17disney.com>  Website：http://www.17disney.com
+-----------------------------------------------------------------------------------------------------------------------
| day-park-mark-charts
| 乐园热门时刻
*/

import echarts from 'echarts'
import Color from 'packages/17disney-common/const/color'
import Charts from './Charts'
import moment from 'moment'
import { markMax, compare } from '@/utils/array'

const NAME = 'day-park-mark-charts'

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
      height: 400,
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

      const markData = data.map(_ => _.mark * 10)
      const flowData = data.map(_ => _.flow)
      const XMax = markMax(flowData, 5000, 3)

      const options = {
        grid: {
          top: 50,
          left: 30,
          right:30,
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
          type: 'category',
          boundaryGap: false,
          data: data.map(_ => _.hour + ':00'),
        },
        yAxis: {
          splitLine: {
            show: false
          },
          type: 'value',
          // boundaryGap: ['0%', '0%'],
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
            show: false,
            showMinLabel: false,
            verticalAlign: 'top',
            margin: -20,
            padding: [5, 0, 5, 0]
          }
        },
        legend: {
          right: 0,
          bottom: 0,
          data: [
            {
              name: '客流量',
              icon: 'roundRect'
            },
            {
              name: '等候时间',
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
            name: '客流量',
            type: 'line',
            smooth: true,
            showSymbol: false,
            markPoint: {
              data: [
                {
                  type: 'max',
                  name: '最大值',
                  symbolSize: 80,
                  itemStyle: {
                    color: Color.colorOrange
                  }
                }
              ]
            },
            // markLine: {
            //   symbolSize: [8, 8],
            //   symbol: ['circle', 'circle'],
            //   label: {
            //     position: 'end',
            //     // formatter: function (params) {
            //     //   const { value, name } = params.data
            //     //   return moment(value, 'x').format('H:mm')
            //     // }
            //   },
            //   lineStyle: {
            //     normal: {
            //       barBorderRadius: 5,
            //       type: 'dashed',
            //       color: Color.colorPick
            //     }
            //   },
            //   data: [
            //     { type: 'max', name: '热门' },
            //   ]
            // },
            areaStyle: {
              color: Color.colorPick,
              opacity: 0.6
            },
            lineStyle: {
              width: 2,
              color: Color.colorPick,
              opacity: 0.85
            },
            itemStyle: {
              color: Color.colorPick,
            },
            data: flowData
          },
          {
            name: '等候时间',
            type: 'line',
            smooth: true,
            showSymbol: false,
            markPoint: {
              label: {
                show: false
              },
              symbol: 'circle',
              data: [
                {
                  type: 'max',
                  name: '最大值',
                  symbolSize: 10,
                  itemStyle: {
                    color: Color.colorOrange
                  }
                }
              ]
            },
            // markLine: {
            //   symbolSize: [8, 8],
            //   symbol: ['circle', 'circle'],
            //   label: {
            //     position: 'end',
            //     // formatter: function (params) {
            //     //   const { value, name } = params.data
            //     //   return moment(value, 'x').format('H:mm')
            //     // }
            //   },
            //   lineStyle: {
            //     normal: {
            //       barBorderRadius: 5,
            //       type: 'dashed',
            //       color: Color.colorPick
            //     }
            //   },
            //   data: [
            //     { type: 'max', name: '热门' },
            //   ]
            // },
            areaStyle: {
              color: Color.colorPrimary,
              opacity: 0.6
            },
            lineStyle: {
              width: 2,
              color: Color.colorPrimary,
              opacity: 0.85
            },
            itemStyle: {
              color: Color.colorPrimary,
            },
            data: markData
          }
        ]
      };

      this.options = options
    }
  }
}
</script>
