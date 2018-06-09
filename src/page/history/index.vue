<style lang='stylus' scoped>
@require '../../styles/disney/var/color.styl';

.select-daterange {
  margin-bottom: 16px;
}

.att-history {
  .title {
    color: $color-gery;
    font-size: 20px;
    line-height: 20px;
    padding-bottom: 16px;
    margin-bottom: 16px;
    border-bottom: 1px solid $color-light-grey-ss;
    font-weight: 500;
    text-align: center;
  }

  .chart-att-count {
    border-radius: 10px;
    background-color: $color-primary-ss;
    max-width: 500px;
    margin: 0 auto;
    margin-top: 32px;
  }
}
</style>
<template>
  <div class="container ds-main">
    <select-date-range class="ds-card" @click="handleClickDateRange" :select="calendar"></select-date-range>
    <div class="ds-card">
      <el-container>
        <el-aside width="320px">
          <att-list-select @click-item="selectAtt" v-model="aid" :data="activeAttList"></att-list-select>
        </el-aside>
        <el-container>
          <el-main class="att-history">
            <h1 class="title">月平均等候时间</h1>
            <calendar :data="attCount" :ym="calendar"></calendar>
            <div class="wait-index">
              <div class="wait-index-item"></div>
            </div>
            <charts-att-count xAxisKey="date" :indexList="['waitAvg']" :data="attCount"></charts-att-count>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<script>
import base from '@/common/mixins/base'
import moment from 'moment'
import { mapState, mapActions, mapGetters } from 'vuex'
import AttListSelect from '@/components/AttList/AttListSelect'

import Calendar from '@/components/Calendar/Calendar'
import ChartsAttCount from '@/components/Charts/ChartsAttCount'
import SelectDateRange from '@/components/Select/SelectDateRange'
import ParkFlowNum from '@/components/Park/ParkFlowNum'

export default {
  components: { AttListSelect, Calendar, ChartsAttCount, SelectDateRange, ParkFlowNum },

  mixins: [base],
  data() {
    return {
      aid: 'attExplorerCanoes',
      dateRange: ['2018-05-01', '2018-05-31'],
      attCount: [],
      calendar: '2018-05',
      loading: true
    }
  },

  computed: {
    activeAttList() {
      return this.attListFilter('attraction', 3)
    }
  },

  async mounted() {
    setTimeout(() => {
      this.init()
    }, 1000)
  },

  methods: {
    init() {
      this.getDestinationsList()
      this.initAtt()
    },

    async initAtt() {
      this.loading = true
      const { local, aid } = this
      const [st, et] = this.dateRange
      this.attCount = await this.$Api.waitTimes.attractions(local, aid, { st, et })

      setTimeout(() => {
        this.loading = false
      }, 500)
    },

    selectAtt(id) {
      this.aid = id
      this.initAtt()
    },
    handleClickDateRange(val) {
      this.dateRange = val
      this.calendar = moment(val, 'YYYY-MM-DD').format('YYYY-MM')
      this.initAtt()
    }
  }
}
</script>
