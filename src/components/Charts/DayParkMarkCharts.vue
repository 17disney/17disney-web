<template>
  <charts :height="height" :options="options" :id="id"></charts>
</template>

<script>
/*
+-----------------------------------------------------------------------------------------------------------------------
| Author: xank <xank@qq.com>  Blog：https://www.xank.cn
+-----------------------------------------------------------------------------------------------------------------------
| Charts-Flow-Day
| 客流量预测图表
*/

import echarts from 'echarts'
import Color from 'package/17disney-common/const/color'
import Charts from './Charts'
import moment from 'moment'
import { markMax, compare } from '@/utils/array'

const NAME = 'charts-flow-day'

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
      height: 330,
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
          top: 0,
          left: 20,
          right: 20,
          bottom: 60
        },
        xAxis: {
          splitLine: {
            show: false
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
          boundaryGap: [0, '100%'],
          axisTick: { // 刻度粗线
            show: false,
            inside: true
          },
          max: XMax,
          axisLine: {
            // show: false
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
          bottom: 0
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
            areaStyle: {
              color: Color.colorPick,
              opacity: 0.6
            },
            lineStyle: {
              width: 2,
              color: Color.colorPick,
              opacity: 0.85
            },
            data: flowData
          },
          {
            name: '乐园指数',
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
            areaStyle: {
              color: Color.colorPrimary,
              opacity: 0.6
            },
            lineStyle: {
              width: 2,
              color: Color.colorPrimary,
              opacity: 0.85
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
