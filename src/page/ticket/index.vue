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

.dialog-shop {
  img {
    width: 100%;
  }
}

.shop-wrapper {
  padding-right: 30px;

  .title {
    border-bottom: 1px solid $color-light-grey-ss;
    color: $color-grey;
    padding-bottom: 18px;
    margin-bottom: 32px;
    margin-top: 28px;
    font-size: 20px;
    line-height: 20px;
  }
}
</style>
<template>
  <div class="container">
    <el-aside width="350px">
      <div class="shop-wrapper">
        <h2 class="title">购买门票</h2>
        <ticket-item @click="handleTicketClick" v-for="(item, index) in shop" :key="index" :data="item"></ticket-item>
      </div>
    </el-aside>
    <dm-main>
      <ft-section-list>
        <select-month min-month="2018-03" @click="handleMonthSelect" v-model="calendar"></select-month>
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
      </ft-section-list>
    </dm-main>

    <el-dialog class="dialog-shop" :visible.sync="dialogVisible" width="50%">
      <img src="http://cdn.17disney.com/20180615180550.jpg" alt="">
    </el-dialog>

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
import FtSectionList from '@/components/FtSection/FtSectionList'
import ChartsTicketMonth from '@/components/Charts/ChartsTicketMonth'
import TicketItem from '@/components/Ticket/TicketItem'

export default {
  components: { SelectMonth, Calendar, FtSection, FtSectionList, ChartsTicketMonth, TicketItem },

  mixins: [base],

  props: {
  },

  data() {
    return {
      dialogVisible: false,
      showMode: null,
      data: [],
      calendar: moment().format('YYYY-MM'),
      dateRange: [],
      loading: false,
      ticketData: [],
      shop: [
        {
          title: '3 日票',
          daterange: '2018年6月22日 至 2018年7月31日',
          desc: '1 儿童三日票',
          price: 499
        },
        {
          title: '3 日票',
          daterange: '2018年6月22日 至 2018年7月31日',
          desc: '1 成人三日票',
          price: 709
        }
      ]
    }
  },

  computed: {},

  mounted() {
    setTimeout(() => {
      this.handleMonthSelect(this.calendar)
    }, 1000)
  },

  methods: {
    handleTicketClick() {
      this.dialogVisible = true
    },
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
