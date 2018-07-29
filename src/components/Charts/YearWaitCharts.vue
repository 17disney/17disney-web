<style lang='stylus'>
</style>
<template>
  <charts :height="height" :options="options" :id="id"></charts>
</template>

<script>
import charts from '@/common/mixins/charts'
import Color from 'package/17disney-common/const/color'

const NAME = 'year-wait-charts'

function getVirtulData(year) {
  year = year || '2017';
  var date = +echarts.number.parseDate(year + '-01-01');
  var end = +echarts.number.parseDate((+year + 1) + '-01-01');
  var dayTime = 3600 * 24 * 1000;
  var data = [];
  for (var time = date; time < end; time += dayTime) {
    data.push([
      echarts.format.formatTime('yyyy-MM-dd', time),
      Math.floor(Math.random() * 1000)
    ]);
  }
  console.log(data)
  return data;
}

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
      height: 400,
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
          pieces: [{
            gt: 0,
            lte: 500,
            color: `rgba(${COLOR}, 0.2)`
          }, {
            gt: 500,
            lte: 900,
            color: `rgba(${COLOR}, 0.5)`
          }, {
            gt: 900,
            lte: 1300,
            color: `rgba(${COLOR}, 0.7)`
          }, {
            gt: 1300,
            color: Color.colorPrimary
          }]
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
            dayLabel: {
              firstDay: 1,
              nameMap: 'cn'
            },
            monthLabel: {
              nameMap: 'cn',
            },
            range: ['2017-07-29', '2018-07-29'],
            cellSize: ['auto', 20],
            splitLine: {
              lineStyle: {
                width: 0.5,
                color: '#000'
              }
            },
            itemStyle: {
              color: '#FFF' //Color.colorPrimary
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
