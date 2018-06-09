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

const NAME = 'charts-att-count'

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
      const DATE_FORMAT = this.$t('ds.dateFormat.monthDay')
      const xAxisData = data.map(_ => moment(_['date'], 'YYYY-MM-DD').format(DATE_FORMAT))

      let option = {
        grid: {
          top: 50,
          left: 30,
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
          max: 250,
          axisLine: {
            show: false
          },
          splitLine: {
            lineStyle: {
              color: Color.colorLightGreySS
            }
          },
          axisLabel: {
            showMinLabel: false,
            color: Color.colorDarkGrey,
          }
        }],
        xAxis: [{
          type: 'category',
          // boundaryGap: false,
          data: xAxisData,
          axisLine: {
            lineStyle: {
              color: Color.colorLightGreyS
            }
          },
          axisLabel: {
            color: Color.colorLightGrey
          }
        }],
        series: [{
          name: this.$t('ds.label.waitsAvg'),
          data: data.map(_ => _['waitAvg']),
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
              // color: '#2492D7',
              color: Color.colorPrimary
              // borderWidth: 3
            }
          }
        },
        {
          name: this.$t('ds.label.waitsMax'),
          data: data.map(_ => _['waitMax']),
          type: 'line',
          smooth: true,
          symbolSize: 2,
          showSymbol: false,
          lineStyle: {
            width: 2,
            type: 'dashed'
          },
          itemStyle: {
            normal: {
              color: Color.colorPrimary
            }
          }
        }]
      }


      this.chart.setOption(option)
    }
  }
}
</script>
