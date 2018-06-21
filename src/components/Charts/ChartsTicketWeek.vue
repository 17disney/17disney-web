<template>
  <charts :delay="delay" :options="options" :id="id"></charts>
</template>

<script>
import echarts from 'echarts'
import Color from 'package/17disney-common/const/color'
import Charts from './Charts'
import moment from 'moment'
const NAME = 'charts-ticket-week'

export default {
  name: NAME,

  components: {
    Charts
  },

  props: {
    delay: Number,
    id: {
      type: String,
      default: NAME
    },
    data: {
      type: Array,
      default: []
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
      const xAxisData = data.map(_ => moment(_['date'], 'YYYY-MM-DD').format('M月D日'))
      const ticketData = data.map(_ => _['ticketNumFT'])

      if (ticketData.length === 0 ) return

      const _max = Math.max(...ticketData)
      const max = (Math.ceil(_max / 10000) + 1) * 10000

      const options = {
        grid: {
          top: 50,
          left: 30,
          right: 25
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: xAxisData,
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, '100%'],
          splitNumber: 4,
          max,
          axisTick: { // 刻度粗线
            show: false,
            inside: true,
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            inside: true,
            showMinLabel: false,
            verticalAlign: 'top',
            margin: -20,
            padding: [5, 0, 5, 0]
          }
        },
        legend: {
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            lineStyle: {
              color: '#243247'
            }
          }
        },
        series: [
          {
            name: this.$t('ds.label.ticketLive'),
            type: 'line',
            smooth: true,
            sampling: 'average',
            itemStyle: {
              normal: {
                color: Color.colorPrimaryS
              }
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: Color.colorPrimary
                }, {
                  offset: 1,
                  color: Color.colorPrimaryS
                }])
              }
            },
            data: data.map(_ => _['ticketNum'])
          },
          {
            name: this.$t('ds.label.forecastTicket'),
            type: 'line',
            smooth: true,
            sampling: 'average',
            itemStyle: {
              normal: {
                color: Color.colorPrimary
              }
            },
            lineStyle: {
              width: 3,
              type: 'dashed'
            },
            data: ticketData
          }
        ]
      };

      this.options = options
    }
  }
}
</script>
