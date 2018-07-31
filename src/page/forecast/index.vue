<style lang='stylus' scoped>
@require '../../styles/disney/var/color.styl';

.dm-card {
  margin-bottom: 30px;
}

.container {
  margin-top: 32px;
}

.ft-date-select {
  margin-bottom: 30px;
}

.ft-index {
  margin-bottom: 30px;
}

.dm-card-att-list {
  .att-list-wrapper {
    height: 645px;
    display: flex;
    flex-direction: column;
    width: 100%;

    .att-list {
      width: 100%;
    }
  }
}

.forecast-time {
  font-size: 13px;
  color: $color-light-grey;
  border-top: 1px solid $color-light-grey-ss;
  padding-top: 15px;
  margin-bottom: 15px;
}
</style>
<template>
  <div class="container">
    <el-row :gutter="50">
      <el-col :span="10">
        <dm-card type="charts">
          <div slot="header" class="clearfix">
            <span>{{this.$t('ds.label.forecastflow')}}</span>
          </div>
          <charts-flow :delay="200" :data="forecast"></charts-flow>
        </dm-card>
        <dm-card type="charts">
          <div slot="header" class="clearfix">
            <span>{{this.$t('ds.label.ticketTrend')}}</span>
          </div>
          <div class="charts-flow">
            <charts-ticket-week :delay="400" :data="forecast"></charts-ticket-week>
          </div>
        </dm-card>
        <div class="forecast-time" v-if="data.utime">{{$t('ds.label.forecastTime')}}{{data.utime | timeFormat('YYYY-MM-DD H:mm:ss', 'x')}}</div>
      </el-col>
      <el-col :span="14">
        <dm-card class="dm-card-att-list" type="charts">
          <div slot="header" class="clearfix">
            <span>{{this.$t('ds.label.attractionWaits')}}</span>
          </div>
          <ft-date-select @click="handleClickDate" v-model="date" :dates="forecast"></ft-date-select>
          <ft-index v-loading="loading" :data="focuesIndex"></ft-index>
          <div v-loading="loading" class="att-list-wrapper">
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
      loading: true,
      forecast: [],
      date: null,
      data: {},
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
    setTimeout(() => {
      this.init()
    }, 1000)
  },

  methods: {
    async init() {
      const data = await this.$Api.forecast.forecastReport('shanghai')
      this.data = data
      this.forecast = data['data']
      this.handleClickDate(0)

      this.loading = false
    },
    handleClickDate(index) {
      const data = this.forecast[index]
      const { ticketNumFT, ticketNum, flowMaxFT } = data

      this.focuesIndex = [
        {
          label: this.$t('ds.label.forecastflow'),
          value: formatNumber(flowMaxFT)
        },
        {
          label: this.$t('ds.label.forecastTicket'),
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
