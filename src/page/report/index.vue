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
    <year-wait-charts :data="attCount"></year-wait-charts>
    <div class="report-list-wrap">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-card>
            323434
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import base from '@/common/mixins/base'
import YearWaitCharts from '@/components/Charts/YearWaitCharts'

export default {
  mixins: [base],

  components: { YearWaitCharts },

  data() {
    return {
      dateRange: ['2017-07-29', '2018-07-29'],
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
