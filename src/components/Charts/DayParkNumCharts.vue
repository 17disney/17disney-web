<template>
  <charts :height="height" :options="options" :id="id"></charts>
</template>

<script>
/*
+-----------------------------------------------------------------------------------------------------------------------
| Author: xank <xank@qq.com>  Blog：https://www.xank.cn
+-----------------------------------------------------------------------------------------------------------------------
| day-park-num-charts
| 乐园指数图表
*/

import Color from 'pkg/17disney-common/const/color'
import Charts from './Charts'
import moment from 'moment'
import { markMax, compare } from '@/utils/array'

const NAME = 'day-park-num-charts'

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
      if (!data || data.length === 0) return

      const indicator = []
      data.forEach(item => {
        const { name, max } = item
        indicator.push({ name, max })
      })

      const options = {
        tooltip: {},
        legend: {
          bottom: 0,
          right: 0
        },
        radar: {
          splitNumber: 0,
          // shape: 'circle',
          name: {
            textStyle: {
              // color: '#fff',
              // backgroundColor: '#999',
              // borderRadius: 3,
              // padding: [3, 5]
            }
          },
          axisLine: {
            lineStyle: {
              color: Color.colorPrimary,
              width: 2,
              type: 'dashed'
            }
          },
          indicator
        },
        series: [{
          type: 'radar',
          data: [
            {
              value: data.map(item => item.history),
              name: '历史均值',
              areaStyle: {
                color: Color.colorGreen,
                opacity: 0.5
              },
              lineStyle: {
                width: 1,
                color: Color.colorGreen,
                opacity: 0.6
              },
              itemStyle: {
                color: Color.colorGreen,
              }
            },
            {
              z: 2,
              value: data.map(item => item.today),
              name: '今日指数',
              areaStyle: {
                color: Color.colorPrimary,
                opacity: 0.5
              },
              lineStyle: {
                width: 1,
                color: Color.colorPrimary,
                opacity: 0.6
              },
              itemStyle: {
                color: Color.colorPrimary,
              }
            }
          ]
        }]
      }

      this.options = options
    }
  }
}
</script>
