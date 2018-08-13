<style lang="stylus" scoped>
.chart-wrapper {
  width: 100%;
  height: 350px;
}
</style>

<template>
  <charts v-if="options" :options="options" :id="id"></charts>
</template>

<script>
/*
+-----------------------------------------------------------------------------------------------------------------------
| Author: xank <xank@qq.com>  Blog：https://www.xank.cn
+-----------------------------------------------------------------------------------------------------------------------
| Charts-Ticket-Month
| 月售票量图表
*/

import Charts from './Charts'
import Color from 'pkg/17disney-common/const/color'
import moment from 'moment'
import { markMax } from '@/utils/array'

const NAME = 'charts-ticket-month'

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
      const DATE_FORMAT = this.$t('ds.dateFormat.monthDay')
      const xAxisData = data.map(_ => moment(_['date'], 'YYYY-MM-DD').format(DATE_FORMAT))

      const maxList = data.map(_ => _['ticketNum'])
      const XMax = markMax(maxList, 5000)

      const options = {
        grid: {
          top: 50,
          left: 50,
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
            lte: 4999,
            color: Color.colorGreen
          }, {
            gt: 5000,
            lte: 9999,
            color: Color.colorYellow
          }, {
            gt: 10000,
            lte: 14999,
            color: Color.colorOrange
          }, {
            gt: 15000,
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
          data: xAxisData,
        }],
        series: [{
          name: '售票量',
          data: data.map(_ => _['ticketNum']),
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
        }]
      }

      this.options = options
    }
  }
}
</script>
