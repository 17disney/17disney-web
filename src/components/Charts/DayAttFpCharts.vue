<template>
  <charts :height="height" :options="options" :id="id"></charts>
</template>

<script>
/*
+-----------------------------------------------------------------------------------------------------------------------
| Author: 17disney <616@17disney.com>  Website：http://www.17disney.com
+-----------------------------------------------------------------------------------------------------------------------
| day-att-fp-charts
| 乐园快速通行证图表
*/

import echarts from 'echarts'
import Color from 'packages/17disney-common/const/color'
import Charts from './Charts'
import moment from 'moment'
import { markMax, compare } from '@/utils/array'

const NAME = 'day-att-fp-charts'

export default {
  name: NAME,

  components: {
    Charts
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
      if (!data) return

      let _data = data.map(_ => _['fpFinish'])
      const XMax = markMax(_data, 1000)

      const dataAxis = data.map(_ => _['name'])

      var dataShadow = [];

      // 背景层
      for (var i = 0; i < _data.length; i++) {
        dataShadow.push(XMax)
      }

      const options = {
        grid: {
          top: 50,
          left: 150,
          right: 20,
          bottom: 30
        },

        xAxis: {
          axisLine: {
            symbol: ['none', 'arrow'],
            lineStyle: {
              color: Color.colorPrimary
            }
          },
          splitLine: {
            show: false
          },
          axisLabel: {
            formatter: function (value, index) {
              return moment(value, 'x').format('H:mm')
            }
          },
        },
        yAxis: {
          boundaryGap: ['20%', '20%'],
          axisLine: {
            symbol: ['none', 'arrow'],
            lineStyle: {
              color: Color.colorPrimary
            }
          },
          data: dataAxis,
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            textStyle: {
              color: Color.colorDarkGrey
            },
            // formatter: function (value, index) {
            //   // 格式化成月/日，只在第一个刻度显示年份
            //   console.log(value)
            //   // return moment(value, 'H:mm:ss')
            //   // var date = new Date(value);
            //   // var texts = [(date.getMonth() + 1), date.getDate()];
            //   // if (index === 0) {
            //   //   texts.unshift(date.getYear());
            //   // }
            //   // return texts.join('/');
            // },
          },
          // inverse: true
        },
        // dataZoom: [
        //   {
        //     // type: 'inside'
        //   }
        // ],
        series: [
          // {
          //   type: 'bar',
          //   itemStyle: {
          //     normal: { color: 'rgba(0,0,0,0.05)' }
          //   },
          //   barGap: '-100%',
          //   barCategoryGap: '40%',
          //   data: dataShadow
          // },
          {
            type: 'bar',
            barWidth: 16,
            markLine: {
              symbolSize: [8, 8],
              symbol: ['circle', 'circle'],
              label: {
                position: 'end',
                formatter: function (params) {
                  const { value, name } = params.data
                  return moment(value, 'x').format('H:mm')
                }
              },
              lineStyle: {
                normal: {
                  barBorderRadius: 5,
                  type: 'dashed',
                  color: Color.colorPick
                }
              },
              data: [
                // { type: 'average', name: '平均' },
                { type: 'max', name: '最慢' },
                { type: 'min', name: '最快' }
              ]
            },

            // markPoint: {
            //   data: [
            //     {
            //       type: 'max',
            //       name: '最大值',
            //       symbolSize: 80,
            //       itemStyle: {
            //         color: Color.colorOrange
            //       }
            //     }
            //   ]
            // },
            itemStyle: {
              normal: {
                barBorderRadius: 20,
                color: new echarts.graphic.LinearGradient(
                  0, 0, 1, 1,
                  [
                    { offset: 0, color: Color.colorPrimaryS },
                    // { offset: 0.5, color: '#188df0' },
                    { offset: 1, color: Color.colorPrimary }
                  ]
                )
              },
            },
            data: _data
          }
        ]
      };


      this.options = options
    }
  }
}
</script>
