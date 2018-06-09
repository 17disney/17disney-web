<style lang='stylus'>
@require '../../styles/disney/var/color.styl';

.ds-main {
  margin-top: 32px;
}
</style>
<template>
  <div class="container ds-main">

    <el-row :gutter="20">
      <el-col :span="10">
        <dm-card>
          <div slot="header" class="clearfix">
            <span>客流趋势</span>
          </div>
          <charts-flow :data="forecast"></charts-flow>

        </dm-card>

        <dm-card>
          <div slot="header" class="clearfix">
            <span>售票量趋势</span>
          </div>
          <div class="charts-flow">
            <charts-ticket-week :data="forecast"></charts-ticket-week>
          </div>
        </dm-card>
      </el-col>
      <el-col :span="14">
        <dm-card>
          <div slot="header" class="clearfix">
            <span>项目等候时间</span>
          </div>
          <ft-date-select @click="handleClickDate" v-model="date" :dates="forecast"></ft-date-select>
          <att-list :data="FtAttList" :date="date" :forecast="attractions"></att-list>
        </dm-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import base from '@/common/mixins/base'

import ParkFlowNum from '@/components/Park/ParkFlowNum'
import AttListTable from '@/components/AttList/AttListTable'
import AttList from '@/components/AttList/AttList'
import FtDateSelect from '@/components/FtDateSelect/FtDateSelect'
import ChartsFlow from '@/components/Charts/ChartsFlow'
import ChartsTicketWeek from '@/components/Charts/ChartsTicketWeek'

export default {
  components: { ParkFlowNum, AttListTable, AttList, FtDateSelect, ChartsFlow, ChartsTicketWeek },

  mixins: [base],
  data() {
    return {
      forecast: [],
      date: null,
      attractions: null
    }
  },

  computed: {
    FtAttList() {
      return this.attListFilter('attraction', 3)
    },
  },

  async mounted() {
    this.getDestinationsList()
    this.init()
  },

  methods: {
    async init() {
      const data = await this.$Api.forecast.forecastReport('shanghai')

      this.forecast = data['data']
      this.handleClickDate(0)

    },
    handleClickDate(index) {
      const { date, attractions } = this.forecast[index]
      this.date = date

      const list = {}
      attractions.forEach(item => {
        list[item.id] = item
      })
      this.attractions = list
    }
  }
}
</script>
