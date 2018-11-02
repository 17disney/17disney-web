<template>
  <charts :options="options" :id="id"></charts>
</template>

<script>
/*
+-----------------------------------------------------------------------------------------------------------------------
| Author: 17disney <616@17disney.com>  Website：http://www.17disney.com
+-----------------------------------------------------------------------------------------------------------------------
| Charts-Att-Count
| 项目月趋势图表
*/

import Charts from './Charts'
import Color from 'pkg/17disney-common/const/color'
import moment from 'moment'
import { markMax } from '@/utils/array'

const NAME = 'charts-att-count'

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
      options: {}
    }
  },
  watch: {
    'data': function (val) {
      this.init()
    }
  },

  mounted() {
    this.init()
  },

  methods: {
    init() {
      const { data } = this
      if (!data) return
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
        tooltip: {
          trigger: 'axis',
        },
        yAxis: [
          {
            type: 'value',
            axisTick: {
              show: false
            },
            max: XMax,
            axisLine: {
              show: false
            }
          }
        ],
        xAxis: [
          {
            type: 'category',
            data: xAxisData,
          }
        ],
        series: [
          {
            name: this.$t('ds.label.waitsAvg'),
            data: data.list, //map(_ => _['waitAvg']),
            type: 'bar',
            barWidth: 8,
            barGap: '-100%',
            showSymbol: false,
            itemStyle: {
              color: Color.colorPrimary
            }
          },
          {
            name: this.$t('ds.label.waitsMax'),
            data: data.map(_ => _['waitMax']),
            type: 'bar',
            barWidth: 8,
            showSymbol: false,
            itemStyle: {
              opacity: 0.5,
              color: Color.colorPick
            }
          }
        ]
      }

      this.options = options
    }
  }
}
</script>
