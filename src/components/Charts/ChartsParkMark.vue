<template>
  <charts :height="height" :options="options" :id="id"></charts>
</template>

<script>
/*
+-----------------------------------------------------------------------------------------------------------------------
| Author: xank <xank@qq.com>  Blog：https://www.xank.cn
+-----------------------------------------------------------------------------------------------------------------------
| Charts-Park-Mark
| 乐园指数图表
*/

import echarts from 'echarts'
import Color from 'package/17disney-common/const/color'
import Charts from './Charts'
import moment from 'moment'

const NAME = 'charts-park-mark'

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
    height: Number,
    data: {
      type: Array,
      default: []
    }
  },

  data() {
    return {
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
      const { data } = this
      const _data = data.map(_ => _[1])

      const XMax = undefined

      const options = {
        grid: {
          top: 0,
          left: 30,
          right: 20
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: data.map(_ => _[0]),
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, '100%'],
          axisTick: { // 刻度粗线
            show: false,
            inside: true
          },
          max: XMax,
          axisLine: {
            show: false
          },
          splitNumber: 4,
          axisLabel: {
            inside: true,
            showMinLabel: false,
            verticalAlign: 'top',
            margin: -20,
            padding: [5, 0, 5, 0]
          }
        },
        legend: {
          show: false
        },
        tooltip: {
          trigger: 'axis',
        },
        series: [
          {
            name: '乐园指数',
            type: 'line',
            smooth: true,
            sampling: 'average',
            itemStyle: {
              normal: {
                color: Color.colorPrimary
              }
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: Color.colorPrimary
                }, {
                  offset: 1,
                  color: Color.colorPrimaryS
                }])
              }
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
