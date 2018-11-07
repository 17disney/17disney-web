<style lang='stylus'>
</style>
<template>
  <charts :height="height" :options="options" :id="id"></charts>
</template>

<script>
import charts from '@/common/mixins/charts'
import Color from 'packages/17disney-common/const/color'
import { colorRgb } from '@/utils/color'
import { deepClone } from '@/utils/util'
const NAME = 'year-wait-bar-charts'

const COLOR = '36,146,215'
const SERIES_ITEM = {
  type: 'bar',
  name: '最长等候',
  barWidth: 16,
  barCategoryGap: '40%',

  markLine: {
    symbolSize: [8, 8],
    symbol: ['circle', 'circle'],
    lineStyle: {
      normal: {
        barBorderRadius: 5,
        type: 'dashed',
        color: Color.colorPick,
      }
    },
    data: [
      { type: 'max', name: '最长' }
    ]
  }
}

export default {
  name: NAME,

  mixins: [charts],

  props: {
    id: {
      type: String,
      default: NAME
    },
    data: Object
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
      let { seriesList } = this.data
      if (!seriesList) return

      const option = {
        series: seriesList.map(item => Object.assign(deepClone(SERIES_ITEM), item))
      }

      this.options = option
    }

  }
}
</script>
