<style lang='stylus' scoped>
@require '../../styles/disney/var/color.styl';

.container {
  margin-top: 32px;
}
</style>
<template>
  <div class="container">
    <el-row>
      <el-col :span="12">
        <h1>乐园日报</h1>
        <!-- <charts-day-flow-mark></charts-day-flow-mark> -->
        <day-park-mark-charts :data="data.markHour"></day-park-mark-charts>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import base from '@/common/mixins/base'
import ChartsDayFlowMark from '@/components/Charts/ChartsDayFlowMark'
import DayParkMarkCharts from '@/components/Charts/DayParkMarkCharts'

export default {
  mixins: [base],

  components: { ChartsDayFlowMark, DayParkMarkCharts },

  props: {
  },

  data() {
    return {
      date: '2018-07-14',
      data: {}
    }
  },

  computed: {},

  mounted() {
    this.init()
  },

  methods: {
    async init() {
      const data = await this.$Api.waitTimes.parkDate(this.local, this.date)
      this.data = data || {}
    }
  }
}
</script>
