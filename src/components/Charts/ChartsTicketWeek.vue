<style lang="stylus" scoped>
.chart-wrapper {
  width: 100%;
  height: 350px;
}
</style>

<template>
  <div class="chart-wrapper" :id="id"></div>
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


    init() {
      this.chart = echarts.init(document.getElementById(this.id))
      const { data } = this

      const xAxisData = data.map(_ => moment(_['date'], 'YYYY-MM-DD').format('M月D日'))
      const ftData = data.map(_ => _['ticketNumFT'])
      const numData = data.map(_ => _['ticketNum'])
      const option = {
        title: {
          show: false
        },
        grid: {
          top: 50,
          left: 30,
          right: 25
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: xAxisData,
          axisLine: {
            lineStyle: {
              color: Color.colorLightGreyS
            }
          },
          axisLabel: {
            color: Color.colorLightGrey
          }
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, '100%'],
          splitNumber: 4,
          max: 40000,
          axisTick: { // 刻度粗线
            show: false,
            inside: true,
          },
          splitLine: {
            lineStyle: {
              color: Color.colorLightGreySS
            }
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            inside: true,
            showMinLabel: false,
            color: Color.colorDarkGrey,
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
            name: '实时售票量',
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
            data: numData
          },
          {
            name: '预测售票量',
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
            data: ftData
          }
        ]
      };

      this.chart.setOption(option)
    }
  }
}
</script>
