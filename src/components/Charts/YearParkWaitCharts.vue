<template>
  <charts ref="raw" @click="handleClick" :height="height" :options="options" :id="id"></charts>
</template>

<script>
import charts from '@/common/mixins/charts'
import Color from 'packages/17disney-common/const/color'
import { colorRgb } from '@/utils/color'
const NAME = 'year-wait-charts'

const COLOR = '36,146,215'

export default {
  name: NAME,

  mixins: [charts],

  props: {
    id: {
      type: String,
      default: NAME
    },
    dateRange: Array,
    data: Array
  },

  data() {
    return {
      height: 160,
      options: null,
      chart: {}
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
    handleClick(params) {
      const { data, seriesIndex, dataIndex } = params
      const { chart } = this.$refs.raw
      this.$emit('click', data[0])

      // chart.dispatchAction({
      //   type: 'dataZoom',
      //   start: 20,
      //   end: 30
      // })

      chart.dispatchAction({
        type: 'downplay',
        seriesIndex
      })

      chart.dispatchAction({
        type: 'highlight',
        seriesIndex,
        dataIndex
      })
    },
    init() {
      this.chart = this.$refs.raw
      let { data, dateRange } = this
      if (!data || data.length === 0) return

      const nData = []

      data.forEach(item => {
        const { date, markAvg } = item
        nData.push([date, markAvg])
      })

      const indicator = []
      data.forEach(item => {
        const { name, max } = item
        indicator.push({ name, max })
      })

      const option = {
        tooltip: {
          position: 'top'
        },
        visualMap: {
          top: 10,
          right: 10,
          show: false,
          pieces: [
            {
              gt: 0,
              lte: 500,
              color: `rgba(${COLOR}, 0.4)`
            },
            {
              gt: 500,
              lte: 900,
              color: `rgba(${COLOR}, 0.7)`
            },
            {
              gt: 900,
              lte: 1300,
              color: Color.colorPrimary
            },
            {
              gt: 1300,
              color: Color.colorPick
            }
          ]
        },
        calendar: [
          {
            top: 15,
            bottom: 0,
            right: 0,
            left: 25,
            dayLabel: {
              firstDay: 1,
              nameMap: 'cn',
              color: Color.colorLightGrey
            },
            monthLabel: {
              nameMap: 'cn',
              color: Color.colorLightGrey
            },
            yearLabel: {
              show: false
            },
            range: dateRange,
            cellSize: ['auto', 20],
            splitLine: {
              lineStyle: {
                width: 0.5,
                color: '#FFF'
              }
            },
            itemStyle: {
              normal: {
                borderColor: '#FFF',
                borderWidth: 1,
              },
              highlight: {
                borderColor: '#000',
              }
            }
          },
        ],

        series: [
          {
            type: 'heatmap',
            coordinateSystem: 'calendar',
            calendarIndex: 0,
            data: nData
          }
        ]
      }

      this.options = option
    }
  }
}
</script>
