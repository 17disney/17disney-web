<template>
  <charts :delay="delay" :options="options" :id="id"></charts>
</template>

<script>
/*
+-----------------------------------------------------------------------------------------------------------------------
| Author: 17disney <616@17disney.com>  Website：http://www.17disney.com
+-----------------------------------------------------------------------------------------------------------------------
| Charts-Flow
| 客流量预测图表
*/

import echarts from 'echarts'
import Color from 'packages/17disney-common/const/color'
import Charts from './Charts'
import moment from 'moment'
import { markMax } from '@/utils/array'

const NAME = 'charts-flow'

export default {
  name: NAME,

  components: {
    Charts
  },

  props: {
    delay: Number,
    id: {
      type: String,
      default: NAME
    },
    data: {
      type: Array,
      default: []
    }
  },

  data() {
    return {
      chart: null,
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
      const xAxisData = data.map(_ => moment(_['date'], 'YYYY-MM-DD').format('M月D日'))
      const _data = data.map(_ => _['flowMaxFT'])
      const XMax = markMax(_data, 5000, 1)
      if (_data.length === 0 ) return

      const options = {
        grid: {
          top: 50,
          left: 30,
          right: 25
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: xAxisData,
          splitLine: {
            show: false
          }
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, '100%'],
          axisTick: { // 刻度粗线
            show: false,
            inside: true
          },
          max: XMax,
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
          top: 0
        },
        tooltip: {

        },
        series: [
          {
            name: this.$t('ds.label.forecastflow'),
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
      }

      this.options = options
    }
  }
}
</script>
