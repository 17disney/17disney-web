<template>
  <charts :height="height" :options="options" :id="id"></charts>
</template>

<script>
/*
+-----------------------------------------------------------------------------------------------------------------------
| Author: 17disney <616@17disney.com>  Website：http://www.17disney.com
+-----------------------------------------------------------------------------------------------------------------------
| Charts-Park-Mark
| 乐园指数图表
*/

import echarts from 'echarts'
import Color from 'pkg/17disney-common/const/color'
import Charts from './Charts'
import moment from 'moment'
import { markMax } from '@/utils/array'

const NAME = 'charts-park-mark'

const VISUAL_MAP = {
  top: 0,
  right: 0,
  show: false,
  pieces: [{
    gt: 0,
    lte: 500,
    color: Color.colorGreen
  }, {
    gt: 500,
    lte: 1000,
    color: Color.colorYellow
  }, {
    gt: 1000,
    lte: 1500,
    color: Color.colorOrange
  }, {
    gt: 1500,
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
      if (!data || data.length === 0) {
        this.options = false
        return
      }

      let _data = data.map(_ => _[1])
      _data = _data.filter(_ => _ > 0)

      const XMax = markMax(_data, 500)

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
              // normal: {
              //   color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              //     offset: 0,
              //     color: Color.colorPrimary
              //   }, {
              //     offset: 1,
              //     color: Color.colorPrimaryS
              //   }])
              // }
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
