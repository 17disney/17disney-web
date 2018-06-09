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
  <div class="container">
    <el-aside width="320px">
      <att-list-select @click-item="selectAtt" v-model="aid" :data="activeAttList"></att-list-select>
    </el-aside>
    <dm-main>
      <!-- <dm-scroll> -->
      <!-- <select-date-range @click="handleClickDateRange" :select="calendar"></select-date-range> -->
      <!-- </dm-scroll> -->
      <ft-section>
        <div slot="header" class="clearfix">
          <span>等候时间日历</span>
        </div>
        <calendar :data="attCount" :ym="calendar"></calendar>
      </ft-section>
      <ft-section>
        <div slot="header" class="clearfix">
          <span>等候时间趋势</span>
        </div>
        <charts-att-count xAxisKey="date" :indexList="['waitAvg']" :data="attCount"></charts-att-count>
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

export default {
  components: { AttListSelect, Calendar, ChartsAttCount, SelectDateRange, FtSection },

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
