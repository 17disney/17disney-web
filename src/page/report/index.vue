<style lang='stylus'>
@require '../../styles/disney/var/color.styl';

.container {
  margin-top: 30px;
}

.report-list-wrap {
  .card--report {
  }
}
</style>
<template>
  <div class="container">
    <el-card>
      <year-wait-charts :data="attCount"></year-wait-charts>
    </el-card>
    <div class="report-list-wrap">

      <el-row :gutter="20">
        <el-col :span="24">
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import base from '@/common/mixins/base'
import YearWaitCharts from '@/components/Charts/YearWaitCharts'
import { dateRange } from '@/utils/date'

console.log(dateRange(-365, 0))

export default {
  mixins: [base],

  components: { YearWaitCharts },

  data() {
    return {
      dateRange: dateRange(-365, 0),
      list: [],
      isInit: false,
      attCount: []
    }
  },

  computed: {},

  mounted() {

    this.init()


  },

  methods: {
    async init() {
      const [st, et] = this.dateRange
      const attCount = await this.$Api.waitTimes.park(this.local, { st, et })
      this.attCount = attCount
    }
  }
}
</script>
