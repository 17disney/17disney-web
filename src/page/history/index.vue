<style lang='stylus'>
</style>
<template>
  <div class="container ds-main">
    <el-card class="card-attcount">
      <select-date-range @click="handleClickDateRange" :select="calendar"></select-date-range>
      <el-container>
        <el-aside width="240px">
          <att-list-select @click-item="selectAtt" v-model="aid" :data="activeAttList"></att-list-select>
        </el-aside>
        <el-container>
          <el-main>
            <calendar :data="attCount" :ym="calendar"></calendar>
            <charts-att-count xAxisKey="date" :indexList="['waitAvg']" :data="attCount"></charts-att-count>
          </el-main>
        </el-container>
      </el-container>
    </el-card>
  </div>
</template>

<script>
import base from '@/common/mixins/base'
import moment from 'moment'
import { mapState, mapActions, mapGetters } from 'vuex'
import Wait from '@/common/api/wait'
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
      dateRange: ['2018-04-01', '2018-04-27'],
      attCount: [],
      calendar: '2018-04',
    }
  },

  computed: {
    activeAttList() {
      return this.attListFilter('attraction', 3)
    }
  },

  async mounted() {
    this.getDestinationsList()
    this.initAtt()
  },

  methods: {
    async initAtt() {
      const { local, aid } = this
      const [st, et] = this.dateRange
      this.attCount = await Wait.attractionsIdCount(local, aid, { st, et })
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
