<style lang="stylus" scoped>
.chart-wrapper {
  width: 100%;
  height: 350px;
}
</style>

<template>
  <charts
    v-if="options"
    :options="options"
    :id="id"
  ></charts>
</template>

<script>
/*
+-----------------------------------------------------------------------------------------------------------------------
| Author: 17disney <616@17disney.com>  Website：http://www.17disney.com
+-----------------------------------------------------------------------------------------------------------------------
| Charts-Ticket-Month
| 月售票量图表
*/

import Charts from './Charts'
import Color from 'packages/17disney-common/const/color'
import moment from 'moment'
import { markMax } from '@/utils/array'
import { TICKET_INDEX_MAP } from '@/common/data/const'

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
          pieces: TICKET_INDEX_MAP
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
