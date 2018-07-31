<style lang='stylus'>
@require '../../styles/disney/var/color.styl';
@require '../../styles/disney/mixin';

.chart {
  &-wrapper {
    width: 100%;
    position: relative;
  }

  &-null {
    cover-color(rgba($color-light-grey-sss,.2));
    flex-cc();

    &__text {
      font-size: 12px;
      color: $color-light-grey;
    }
  }
}
</style>
<template>
  <div class="chart-wrapper" v-loading="loading" :style="{height: height + 'px'}">
    <div :style="{height: height + 'px'}" :id="id"></div>
    <div class="chart-null" v-if="isNull">
      <div class="chart-null__text">暂无数据</div>
    </div>
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
    options: [Object, Boolean],
    // isNull: {
    //   type: Boolean,
    //   default: false
    // },
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
      isDraw: false,
      isNull: false
    }
  },

  watch: {
    'options': function (val) {
      console.log(val)
      this.loading = true
      this.init()
    }
  },

  mounted() {
    if (!this.isDraw) {
      this.init()
    }
  },

  methods: {
    init() {
      const chart = echarts.init(document.getElementById(this.id), theme)
      const { options, delay } = this

      console.log(options)

      if (!options) {
        this.loading = false
        this.isNull = true
        return
      }

      this.isNull = false
      // 首次渲染增加延迟（性能优化)
      if (!this.isDraw) {
        setTimeout(() => {
          this.isDraw = true
          this.loading = false
          chart.setOption(options)
        }, delay)
      } else {
        chart.setOption(options)
        this.loading = false
      }
    }
  }
}
</script>
