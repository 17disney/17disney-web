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

.el-aside {
  width: 320px;
  margin-right: 50px;
}

.att-date-select {
  margin-bottom: 30px;
}
</style>
<template>
  <div class="container">
    <el-aside width="320px">
      <att-list-select @click-item="handleAttSelect" v-model="aid" :data="activeAttList"></att-list-select>
    </el-aside>
    <dm-main>
      <select-month @click="handleMonthSelect" v-model="calendar"></select-month>
      <ft-section>
        <div slot="header" class="clearfix">
          <span>等候时间日历</span>
        </div>
        <calendar v-loading="loading" :data="attCount" :ym="calendar"></calendar>
      </ft-section>
      <ft-section>
        <div slot="header" class="clearfix">
          <span>等候时间趋势</span>
        </div>
        <charts-att-count v-loading="loading" :data="attCount"></charts-att-count>
      </ft-section>
    </dm-main>
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

import FtSection from '@/components/FtSection/FtSection'
import SelectMonth from '@/components/SelectMonth/SelectMonth'

export default {
  components: { AttListSelect, Calendar, ChartsAttCount, SelectDateRange, FtSection, SelectMonth },

  mixins: [base],
  data() {
    return {
      aid: 'attExplorerCanoes',
      dateRange: [],
      attCount: [],
      calendar: null,
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
      this.handleMonthSelect(moment().format('YYYY-MM'))
    },
    async initAtt() {
      this.loading = true
      const { local, aid } = this
      const [st, et] = this.dateRange

      setTimeout( async () => {
        this.attCount = await this.$Api.waitTimes.attractions(local, aid, { st, et })
        this.loading = false
      }, 500)
    },
    // 选择项目
    handleAttSelect(id) {
      this.aid = id
      this.initAtt()
    },
    // 选择月份
    handleMonthSelect(val) {
      const dateRange = [moment(val, 'YYYY-MM').startOf('month').format('YYYY-MM-DD'), moment(val, 'YYYY-MM').endOf('month').format('YYYY-MM-DD')]

      this.dateRange = dateRange
      this.calendar = val
      this.initAtt()
    }
  }
}
</script>
