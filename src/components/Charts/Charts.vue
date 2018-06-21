<style lang='stylus'>
.chart-wrapper {
  width: 100%;
}
</style>
<template>
  <div class="chart-wrapper" v-loading="loading" :style="{height: height + 'px'}">
    <div :style="{height: height + 'px'}" :id="id"></div>
  </div>
</template>

<script>
/*
+-----------------------------------------------------------------------------------------------------------------------
| Author: xank <xank@qq.com>  Blog：https://www.xank.cn
+-----------------------------------------------------------------------------------------------------------------------
| Charts
| 基础图表组件
*/

import echarts from 'echarts'
import Color from 'package/17disney-common/const/color'
import theme from '@/common/data/echarts-theme'

export default {
  components: {},

  props: {
    id: String,
    options: Object,
    delay: {
      type: Number,
      default: 200
    },
    height: {
      type: Number,
      default: 350
    }
  },

  data() {
    return {
      loading: true,
      isDraw: false
    }
  },

  watch: {
    'options': function () {
      this.loading = true
      this.init()
    }
  },

  methods: {
    init() {
      const chart = echarts.init(document.getElementById(this.id), theme)

      if (!this.isDraw) {
        setTimeout(() => {
          chart.setOption(this.options)
          this.loading = false
          this.isDraw = true
        }, this.delay)
      } else {
        chart.setOption(this.options)
        this.loading = false
      }
    }
  }
}
</script>
