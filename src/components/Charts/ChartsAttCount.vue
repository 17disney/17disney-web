<template>
  <div class="chart chart--att-count chart--full">
    <div class="inner" :id="id"></div>
  </div>
</template>

<script>
import echarts from 'echarts'
import Color from '@/common/color'
// import moment from 'moment'

export default {
  props: {
    id: {
      type: String,
      default: 'chart'
    },
    data: {
      type: Array,
      default: []
    },
    // sort: {
    //   type: Array,
    //   default: []
    // },
    indexList: {
      type: Array,
      default: function() {
        return ['num']
      }
    },

    xAxisKey: {
      type: String,
      default: 'key'
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
    'data': function(val) {
      this.init()
    },
    'indexList': function(val) {
      this.init()
    }
  },
  methods: {
    initSeries(data, key) {
      const name = this.Filters.fieldName(key)
      const series = {
        name,
        data,
        type: 'bar',
        smooth: true,
        // symbol: 'circle',
        symbolSize: 2,
        showSymbol: false,
        barWidth: '40%',
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
      const { data, legend, xAxisKey, indexList } = this

      // 设置x轴数据
      const xAxisData = data.map(_ => _[xAxisKey])
      const series = []
      indexList.forEach(item => {
        const _data = data.map(_ => _[item])
        const _series = this.initSeries(_data, item)
        series.push(_series)
      })

      const option = {
        grid: {
          top: 50,
          left: '2%',
          right: '2%',
          bottom: '2%',
          containLabel: true
        },

        visualMap: {
          top: 10,
          right: 10,
          pieces: [{
            gt: 0,
            lte: 60,
            color: Color.colorPrimary
          }, {
            gt: 60,
            lte: 300,
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
          axisLine: {
            lineStyle: {
              color: '#5C6B80'
            }
          },
          // axisLabel: {
          //   margin: 10,
          //   textStyle: {
          //     fontSize: 12
          //   }
          // },
          splitLine: {
            lineStyle: {
              color: '#EDF1F4'
            }
          }
        }],

        legend: {
          data: [legend]
        },

        xAxis: [{
          type: 'category',
          // boundaryGap: false,
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
