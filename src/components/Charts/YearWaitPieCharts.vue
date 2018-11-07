<style lang='stylus'>
</style>
<template>
  <charts :height="height" :options="options" :id="id"></charts>
</template>

<script>
import charts from '@/common/mixins/charts'
import Color from 'packages/17disney-common/const/color'
import { colorRgb } from '@/utils/color'
const NAME = 'year-wait-pie-charts'

const COLOR = '36,146,215'

export default {
  name: NAME,

  mixins: [charts],

  components: {
  },

  props: {
    id: {
      type: String,
      default: NAME
    },
    dateRange: Array,
    data: Array
  },

  data() {
    return {
      height: 260,
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
      let { data, dateRange } = this
      if (!data || data.length === 0) return

      const nData = []

      const indicator = []
      data.forEach(item => {
        const { name, max } = item
        indicator.push({ name, max })
      })

      const option = {
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }

      this.options = option
    }

  }
}
</script>
