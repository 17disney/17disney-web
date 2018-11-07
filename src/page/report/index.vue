<style lang='stylus' scoped>
@require '~@/styles/disney/var/color.styl';

.navbar-page {
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>

<template>
  <div class="container">
    <navbar-page :data="navbar"></navbar-page>
    <el-card style="margin-bottom: 20px;">
      <YearWaitCharts ref="chart" @click="handleClick" :data="attCount" :date-range="dateRange"></YearWaitCharts>
    </el-card>

    <el-card>
      <YearParkWaitCharts ref="yearParkWaitCharts" :data="attCount"></YearParkWaitCharts>
    </el-card>
    <router-view :select="date"></router-view>
  </div>
</template>

<script>
import base from '@/common/mixins/base'
import { dateRange } from '@/utils/date'

import NavbarPage from '@/components/Navbar/NavbarPage'
import YearWaitCharts from '@/components/Charts/YearWaitCharts'
import YearParkWaitCharts from '@/components/Charts/YearParkWaitCharts'

export default {
  mixins: [base],

  components: { NavbarPage, YearWaitCharts, YearParkWaitCharts },

  data() {
    return {
      dateRange: dateRange(-365, 0),
      attCount: [],
      date: '',
      navbar: [
        {
          label: '首页',
          to: 'home'
        },
        {
          label: '运营日报',
          to: 'day'
        },
        {
          label: '运营周报',
          to: 'week'
        },
        {
          label: '运营月报',
          to: 'month'
        },
        {
          label: '运营年报',
          to: 'year'
        }
      ]
    }
  },

  computed: {},

  mounted() {
    this.init()
  },

  methods: {
    async init() {
      this.chart = this.$refs.chart
      const [st, et] = this.dateRange
      const attCount = await this.$Api.waitTimes.park(this.local, { st, et })

      this.attCount = attCount
    },

    handleClick(date) {
      this.date = date
      this.$router.push({
        path: `/report/day/?date=${date}`
      })

      console.log(this.chart)


    }
  }
}
</script>
