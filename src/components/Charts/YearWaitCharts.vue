<style lang='stylus'>
</style>
<template>
  <charts :height="height" :options="options" :id="id"></charts>
</template>

<script>
import charts from '@/common/mixins/charts'
import Color from 'package/17disney-common/const/color'
import { colorRgb } from '@/utils/color'
const NAME = 'year-wait-charts'

const COLOR = '36,146,215'

export default {
  name: NAME,

  mixins: [charts],

  components: {
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
      height: 160,
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
        // visualMap: {
        //   min: 0,
        //   max: 2000,
        //   calculable: true,
        //   orient: 'horizontal',
        //   left: 'center',
        //   top: 'top'
        // },
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
            range: ['2017-07-29', '2018-07-29'],
            cellSize: ['auto', 20],
            splitLine: {
              lineStyle: {
                width: 0.5,
                color: '#FFF'
              }
            },
            itemStyle: {
              // color: `rgba(${COLOR}, 0.1)`, //Color.colorPrimary
              borderColor: '#FFF',
              borderWidth: 1,
            }
          },
          // {
          //   top: 260,
          //   range: '2016',
          //   cellSize: ['auto', 20]
          // },
          // {
          //   top: 450,
          //   range: '2015',
          //   cellSize: ['auto', 20],
          //   right: 5
          // }
        ],

        series: [
          {
            type: 'heatmap',
            coordinateSystem: 'calendar',
            calendarIndex: 0,
            data: nData
          },
          // {
          //   type: 'heatmap',
          //   coordinateSystem: 'calendar',
          //   calendarIndex: 1,
          //   data: getVirtulData(2016)
          // },
          // {
          //   type: 'heatmap',
          //   coordinateSystem: 'calendar',
          //   calendarIndex: 2,
          //   data: getVirtulData(2015)
          // }
        ]

      };

      this.options = option
    }

  }
}
</script>
