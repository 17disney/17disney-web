<style lang='stylus' scoped>
.chart-base-line {
  width: 100%;
  height: 40px;
}
</style>
<template>
  <div :id="id" class="chart chart-base-line"></div>
</template>

<script>
import echarts from 'echarts'
export default {
  components: {},

  props: {
    data: Array,
    default: [],
    id: {
      type: String,
      default: 'chart'
    }
  },

  data() {
    return {
      chart: null
    }
  },
  watch: {
    'data': function(val) {
      if (val.length > 0) {
        this.init()
      }
    }
  },
  computed: {},

  mounted() {
    // this.init()
  },

  methods: {
    init() {
      const { data } = this
      this.chart = echarts.init(document.getElementById(this.id))
      const option = {
        grid: {
          top: 0,
          left: 0,
          right: 0,
          bottom: 0
        },

        xAxis: {
          show: true,
          type: 'category',
          boundaryGap: ['0%', '0%'],
          data: data.map(_ => _[0])
        },
        yAxis: {
          show: false,
          type: 'value'
        },
        series: [{
          data: data.map(_ => _[1]),
          boundaryGap: ['0%', '0%'],
          type: 'line',
          showSymbol: false,
          lineStyle: {
            color: '#2492D7'
          },
          areaStyle: {
            color: '#A1D4EE'
          }
        }]
      }
      this.chart.setOption(option)
    }
  }
}
</script>
