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
const NAME = 'charts-flow'

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
      const _data = data.map(_ => _['flowMaxFT'])
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
          axisTick: { // 刻度粗线
            show: false,
            inside: true
          },
          splitLine: {
            lineStyle: {
              color: Color.colorLightGreySS
            }
          },
          axisLine: {
            show: false
          },
          splitNumber: 4,
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
          top: 0
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
            name: '预测客流',
            type: 'line',
            smooth: true,
            sampling: 'average',
            itemStyle: {
              normal: {
                color: Color.colorPrimary
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
            data: _data
          }
        ]
      };


      this.chart.setOption(option)
    }
  }
}
</script>
