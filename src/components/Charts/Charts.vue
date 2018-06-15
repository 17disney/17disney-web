<style lang='stylus'>
.chart-wrapper {
  width: 100%;
}
</style>
<template>
  <div v-loading="loading" :style="{height: height + 'px'}" class="chart-wrapper" :id="id"></div>
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
    height: {
      type: Number,
      default: 350
    }
  },

  data() {
    return {
      loading: true
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
      chart.setOption(this.options)
      this.loading = false
    }
  }
}
</script>
