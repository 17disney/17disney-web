<template>
  <charts :options="options" :id="id"></charts>
</template>

<script>
/*
+-----------------------------------------------------------------------------------------------------------------------
| Author: xank <xank@qq.com>  Blog：https://www.xank.cn
+-----------------------------------------------------------------------------------------------------------------------
| Charts-Att-Count
| 项目月趋势图表
*/

import Charts from './Charts'
import Color from 'package/17disney-common/const/color'
import moment from 'moment'
import { markMax } from '@/utils/array'

const NAME = 'charts-day-flow-mark'

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
    data: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      options: null
    }
  },
  watch: {
    'data': function (val) {
      this.init()
    }
  },
  methods: {
    init() {
      const { data } = this
      const DATE_FORMAT = this.$t('ds.dateFormat.monthDay')
      const xAxisData = data.map(_ => moment(_['date'], 'YYYY-MM-DD').format(DATE_FORMAT))

      let maxList = data.map(_ => _['waitMax'])
      let XMax = markMax(maxList, 50)

      const options = {
        grid: {
          top: 50,
          left: 30,
          right: 25,
          bottom: 25
        },
        legend: {
          // show: false,
        },
        visualMap: {
          top: 10,
          right: 10,
          show: false,
          pieces: [{
            gt: 0,
            lte: 30,
            color: Color.colorGreen
          }, {
            gt: 30,
            lte: 60,
            color: Color.colorYellow
          }, {
            gt: 60,
            lte: 120,
            color: Color.colorOrange
          }, {
            gt: 120,
            color: Color.colorRed
          }]
        },
        tooltip: {
          trigger: 'axis',
        },
        yAxis: [{
          type: 'value',
          axisTick: {
            show: false
          },
          max: XMax,
          axisLine: {
            show: false
          }
        }],
        xAxis: [{
          type: 'category',
          // boundaryGap: false,
          data: xAxisData,
        }],
        series: [{
          name: this.$t('ds.label.waitsAvg'),
          data: data.map(_ => _['waitAvg']),
          type: 'bar',
          smooth: true,
          symbolSize: 2,
          showSymbol: false,
          barWidth: '35%',
          lineStyle: {
            width: 3
          },
          itemStyle: {
            normal: {
              color: Color.colorPrimary
            }
          }
        },
        {
          name: this.$t('ds.label.waitsMax'),
          data: data.map(_ => _['waitMax']),
          type: 'line',
          smooth: true,
          symbolSize: 2,
          showSymbol: false,
          lineStyle: {
            width: 2,
            type: 'dashed'
          }
        }]
      }

      this.options = options
    }
  }
}
</script>
