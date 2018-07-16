<template>
  <charts :height="height" :options="options" :id="id"></charts>
</template>

<script>
/*
+-----------------------------------------------------------------------------------------------------------------------
| Author: xank <xank@qq.com>  Blog：https://www.xank.cn
+-----------------------------------------------------------------------------------------------------------------------
| day-att-rank-charts
| 客流量预测图表
*/

import echarts from 'echarts'
import Color from 'package/17disney-common/const/color'
import Charts from './Charts'
import moment from 'moment'
import { markMax, compare } from '@/utils/array'

const NAME = 'day-att-rank-charts'

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

      let _data = data.map(_ => _['waitAvg'])


      const XMax = markMax(_data, 10)

      const dataAxis = data.map(_ => _['name'])

      // var dataAxis = ['点', '击', '柱', '子', '或', '者', '两', '指', '在', '触', '屏', '上', '滑', '动', '能', '够', '自', '动', '缩', '放'];
      // var data2 = [220, 182, 191, 234, 290, 330, 310, 123, 442, 321, 90, 149, 210, 122, 133, 334, 198, 123, 125, 220];
      // var yMax = 500;
      var dataShadow = [];

      // 背景层
      for (var i = 0; i < _data.length; i++) {
        dataShadow.push(XMax)
      }

      const options = {
        grid: {
          top: 0,
          left: 150,
          right: 20,
          bottom: 20
        },

        xAxis: {

          // axisTick: {
          //   show: false
          // },
          // axisLine: {
          //   show: false
          // },
          // z: 10
        },
        yAxis: {
          data: dataAxis,
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            textStyle: {
              color: '#999'
            }
          },
          inverse: true
        },
        dataZoom: [
          {
            type: 'inside'
          }
        ],
        series: [
          {
            type: 'bar',
            itemStyle: {
              normal: { color: 'rgba(0,0,0,0.05)' }
            },
            barGap: '-100%',
            barCategoryGap: '40%',
            data: dataShadow
          },
          {
            type: 'bar',
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0, 0, 1, 1,
                  [
                    { offset: 0, color: '#83bff6' },
                    { offset: 0.5, color: '#188df0' },
                    { offset: 1, color: '#188df0' }
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
