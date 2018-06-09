<style lang='stylus' scoped>
@require '../../styles/disney/var/color.styl';

.ds-main {
  margin-top: 32px;
}

.dm-card {
  margin-bottom: 30px;
}

.ft-date-select {
  margin-bottom: 30px;
}

.ft-index {
  margin-bottom: 30px;
}

.dm-card-att-list {
  .att-list-wrapper {
    height: 640px;
    display: flex;
    flex-direction: column;
    width: 100%;

    .att-list {
      width: 100%;
    }
  }
}
</style>
<template>
  <div class="container ds-main">
    <el-row :gutter="50">
      <el-col :span="10">
        <dm-card>
          <div slot="header" class="clearfix">
            <span>客流量预测</span>
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
        <dm-card class="dm-card-att-list">
          <div slot="header" class="clearfix">
            <span>项目等候时间</span>
          </div>
          <ft-date-select @click="handleClickDate" v-model="date" :dates="forecast"></ft-date-select>
          <ft-index :data="focuesIndex"></ft-index>
          <div class="att-list-wrapper">
            <dm-scroll>
              <att-list :data="FtAttList" :date="date" :forecast="attractions"></att-list>
            </dm-scroll>
          </div>
        </dm-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import { formatNumber } from '@/common/filters'
import base from '@/common/mixins/base'

import ParkFlowNum from '@/components/Park/ParkFlowNum'
import AttListTable from '@/components/AttList/AttListTable'
import AttList from '@/components/AttList/AttList'
import FtDateSelect from '@/components/FtDateSelect/FtDateSelect'
import ChartsFlow from '@/components/Charts/ChartsFlow'
import ChartsTicketWeek from '@/components/Charts/ChartsTicketWeek'
import FtIndex from '@/components/FtIndex/FtIndex'

export default {
  components: { ParkFlowNum, AttListTable, AttList, FtDateSelect, ChartsFlow, ChartsTicketWeek, FtIndex },

  mixins: [base],
  data() {
    return {
      forecast: [],
      date: null,
      attractions: null,
      focuesData: null,
      focuesIndex: []
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
      const data = this.forecast[index]

      const { ticketNumFT, ticketNum, flowMaxFT } = data

      this.focuesIndex = [
        {
          label: '预测客流量',
          value: formatNumber(ticketNumFT)
        },
        {
          label: '预测售票量',
          value: formatNumber(ticketNumFT)
        }
      ]

      const { date, attractions } = data
      this.focuesData = data
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
