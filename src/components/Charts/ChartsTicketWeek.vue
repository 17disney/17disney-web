<template>
  <div class="chart chart-att-count">
    <div class="inner" :id="id"></div>
  </div>
</template>

<script>
import echarts from 'echarts'
import Color from 'package/17disney-common/const/color'
import moment from 'moment'
const NAME = 'charts-ticket-week'

export default {
  name: NAME,

  props: {
    id: {
      type: String,
      default: NAME
    },
    data: {
      type: Array,
      default: []
    },
    indexList: {
      type: Array,
      default: function () {
        return ['ticketNumFT']
      }
    },
    xAxisKey: {
      type: String,
      default: 'date'
    }
  },
  data() {
    return {
      chart: null
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
    initSeries(data, key) {

      const series = {
        data,
        type: 'bar',
        smooth: true,
        symbol: 'circle',
        symbolSize: 2,
        showSymbol: false,
        lineStyle: {
          width: 3
        },
        itemStyle: {
          normal: {
            // color: '#2492D7',
            color: Color.colorPrimary
            // borderWidth: 3
          }
        }
      }
      return series
    },

    init() {
      this.chart = echarts.init(document.getElementById(this.id))
      const { data, xAxisKey, indexList } = this

      // 设置x轴数据
      // const xAxisData = data.map(_ => _[xAxisKey])

      const xAxisData = data.map(_ => moment(_['date'], 'YYYY-MM-DD').format('M月D日'))

      const series = []
      indexList.forEach(item => {
        const _data = data.map(_ => _[item])
        const _series = this.initSeries(_data, item)
        series.push(_series)
      })

      if (!data) return

      let option = {
        // grid: {
        //   top: 50,
        //   left: '2%',
        //   right: '2%',
        //   bottom: '2%',
        //   containLabel: true
        // },
        legend: {
          show: false,
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
          axisPointer: {
            lineStyle: {
              color: '#243247'
            }
          }
        },
        yAxis: [{
          type: 'value',
          axisTick: {
            show: false
          },
          max: 30000,
          axisLine: {
            lineStyle: {
              color: '#5C6B80'
            }
          },

          splitLine: {
            lineStyle: {
              color: '#EDF1F4'
            }
          }
        }],
        xAxis: [{
          type: 'category',
          axisLine: {
            lineStyle: {
              color: '#5C6B80'
            }
          },
          data: xAxisData
        }],
        series
      }

      this.chart.setOption(option)
    }
  }
}
</script>
