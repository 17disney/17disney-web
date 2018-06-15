<style lang='stylus' scoped>
@require '../../styles/disney/var/color.styl';

.container {
  margin-top: 30px;
  display: flex;
  overflow: hidden;

  .dm-main {
    flex: 1;
  }
}
</style>
<template>
  <div class="container">
    <el-aside width="320px">
      购买
    </el-aside>
    <dm-main>
      <select-month @click="handleMonthSelect" v-model="calendar"></select-month>
      <ft-section>
        <div slot="header" class="clearfix">
          <span>售票量日历</span>
        </div>
        <calendar mode="ticket" v-loading="loading" :data="ticketData" :ym="calendar"></calendar>
      </ft-section>
      <ft-section>
        <div slot="header" class="clearfix">
          <span>售票量趋势</span>
        </div>
        <charts-ticket-month :data="ticketData"></charts-ticket-month>
      </ft-section>
    </dm-main>
  </div>
</template>

<script>
/*
+-----------------------------------------------------------------------------------------------------------------------
| Author: xank <xank@qq.com>  Blog：https://www.xank.cn
+-----------------------------------------------------------------------------------------------------------------------
| Ticket -index
| 售票量 - 主页
*/

import base from '@/common/mixins/base'
import moment from 'moment'
import SelectMonth from '@/components/SelectMonth/SelectMonth'
import Calendar from '@/components/Calendar/Calendar'
import FtSection from '@/components/FtSection/FtSection'
import ChartsTicketMonth from '@/components/Charts/ChartsTicketMonth'

export default {
  components: { SelectMonth, Calendar, FtSection, ChartsTicketMonth },

  mixins: [base],

  props: {
  },

  data() {
    return {
      showMode: null,
      data: [],
      calendar: moment().format('YYYY-MM'),
      dateRange: [],
      loading: false,
      ticketData: []
    }
  },

  computed: {},

  mounted() {
    this.handleMonthSelect(this.calendar)

  },

  methods: {
    async init() {
      const [st, et] = this.dateRange
      const data = await this.$Api.waitTimes.ticket(this.local, { st, et })
      const fData = await this.$Api.forecast.tickets(this.local, { st, et })

      data.forEach((item, index) => {
        item = Object.assign(item, fData[index])
      })

      this.ticketData = data
    },
    // 选择月份
    async handleMonthSelect(val) {
      const dateRange = [moment(val, 'YYYY-MM').startOf('month').format('YYYY-MM-DD'), moment(val, 'YYYY-MM').endOf('month').format('YYYY-MM-DD')]

      this.dateRange = dateRange
      this.calendar = val
      this.loading = true
      this.ticketData = []
      await this.init()
      this.loading = false
    }

  }
}
</script>
