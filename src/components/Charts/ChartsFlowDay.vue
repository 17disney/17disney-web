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
import Color from 'pkg/17disney-common/const/color'
import Charts from './Charts'
import moment from 'moment'
import { markMax } from '@/utils/array'

const NAME = 'charts-flow-day'

const VISUAL_MAP = {
  top: 0,
  right: 0,
  show: false,
  pieces: [{
    gt: 0,
    lte: 30000,
    color: Color.colorGreen
  }, {
    gt: 30000,
    lte: 45000,
    color: Color.colorYellow
  }, {
    gt: 45000,
    lte: 60000,
    color: Color.colorOrange
  }, {
    gt: 60000,
    color: Color.colorRed
  }]
}

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
    data: Array
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
      if (!data) return

      let _data = data.map(_ => _[1])

      // 去除右空值
      for (let i = _data.length; i > 0; i--) {
        const val = _data[i]
        if (val > 0) {
          _data.length = i + 1
          break
        }
      }

      const XMax = markMax(_data, 5000)

      const options = {
        grid: {
          top: 0,
          left: 30,
          right: 20,
          bottom: 20
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
        visualMap: VISUAL_MAP,
        legend: {
          show: false
        },
        tooltip: {
          trigger: 'axis',
        },
        series: [
          {
            name: '客流量',
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
                // color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                //   offset: 0,
                //   color: Color.colorPrimary
                // }, {
                //   offset: 1,
                //   color: Color.colorPrimaryS
                // }])
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
