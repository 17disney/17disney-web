<template>
  <div class="chart chart-att-count">
    <div class="inner" :id="id"></div>
  </div>
</template>

<script>
import echarts from 'echarts'
import Color from '@/common/color'

export default {
  props: {
    id: {
      type: String,
      default: 'charts-att-count'
    },
    data: {
      type: Array,
      default: []
    },
    indexList: {
      type: Array,
      default: function () {
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
    'data': function (val) {
      this.init()
    }
  },
  methods: {
    initSeries(data, key) {
      // const name = this.Filters.fieldName(key)
      const series = {
        // name,
        data,
        type: 'bar',
        smooth: true,
        // symbol: 'circle',
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
      }
      return series
    },

    init() {
      this.chart = echarts.init(document.getElementById(this.id))
      const { data, xAxisKey, indexList } = this

      // 设置x轴数据
      const xAxisData = data.map(_ => _[xAxisKey])
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
          max: 250,
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

      // option = {
      //   legend: {
      //     show: false,
      //   },
      //   xAxis: [
      //     {
      //       type: 'category',
      //       boundaryGap: false,
      //       data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      //     }
      //   ],
      //   yAxis: [
      //     {
      //       type: 'value'
      //     }
      //   ],
      //   series: [
      //     {
      //       name: '邮件营销',
      //       type: 'line',
      //       stack: '总量',
      //       areaStyle: { normal: {} },
      //       data: [120, 132, 101, 134, 90, 230, 210]
      //     }
      //   ]
      // };
      // console.log(option)

      this.chart.setOption(option)
    }
  }
}
</script>
