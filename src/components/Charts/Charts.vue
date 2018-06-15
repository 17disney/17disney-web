<style lang='stylus'>
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
import theme from '@/common/data/echarts-theme'

export default {
  components: {},

  props: {
    options: Object,
    id: String
  },

  watch: {
    'options': function () {
      this.init()
    }
  },

  methods: {
    init() {
      const chart = echarts.init(document.getElementById(this.id), theme)
      chart.setOption(this.options)
    }
  }
}
</script>
