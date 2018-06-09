<style lang='stylus' scoped>
@require '../../styles/disney/var/color.styl';

.container {
  margin-top: 30px;
  display: flex;
  overflow: hidden;

  .dm-main {
    flex: 1;
  }

  .ft-index {
    margin-top: 30px;
  }
}

.el-aside {
  width: 320px;
  margin-right: 50px;
}

.att-date-select {
  margin-bottom: 30px;
}

.att-list-scroll-wrapper {
  height: 900px;
}

.ft-section-list {
  .ft-section {
    &:last-child {
      border: none;
    }
  }
}
</style>
<template>
  <div class="container">
    <el-aside width="320px">
      <dm-scroll class="att-list-scroll-wrapper">
        <att-list-select @click-item="handleAttSelect" v-model="aid" :data="activeAttList"></att-list-select>
      </dm-scroll>
    </el-aside>
    <dm-main>
      <select-month @click="handleMonthSelect" v-model="calendar"></select-month>
      <div class="ft-section-list">
        <ft-section>
          <div slot="header" class="clearfix">
            <span>{{info.name}}</span>
          </div>
          <att-media  :medias="info.medias"></att-media>
        </ft-section>

        <ft-section>
          <div slot="header" class="clearfix">
            <span>{{$t('ds.label.waitsCalendar')}}</span>
          </div>
          <calendar v-loading="loading" :data="attCount" :ym="calendar"></calendar>
          <!-- <ft-index :data="attIndex"></ft-index> -->
        </ft-section>
        <ft-section>
          <div slot="header" class="clearfix">
            <span>{{$t('ds.label.waitsTrend')}}</span>
          </div>
          <charts-att-count v-loading="loading" :data="attCount"></charts-att-count>
        </ft-section>
      </div>
      <!-- <ft-section>
        <div slot="header" class="clearfix">
          <span>历史最高等候</span>
        </div>
        {{attRank}}
      </ft-section> -->
    </dm-main>
  </div>
</template>

<script>
import base from '@/common/mixins/base'
import moment from 'moment'
import { mapState, mapActions, mapGetters } from 'vuex'

import FtIndex from '@/components/FtIndex/FtIndex'
import AttListSelect from '@/components/AttList/AttListSelect'
import Calendar from '@/components/Calendar/Calendar'
import ChartsAttCount from '@/components/Charts/ChartsAttCount'
import SelectDateRange from '@/components/Select/SelectDateRange'
import FtSection from '@/components/FtSection/FtSection'
import SelectMonth from '@/components/SelectMonth/SelectMonth'

export default {
  components: { FtIndex, AttListSelect, Calendar, ChartsAttCount, SelectDateRange, FtSection, SelectMonth },

  mixins: [base],
  data() {
    return {
      aid: null,
      info: {},
      attIndex: [],
      attCount: [],
      attRank: [],
      calendar: moment().format('YYYY-MM'),
      dateRange: [],
      loading: true
    }
  },

  computed: {
    activeAttList() {
      const list = this.attListFilter('attraction', 3)
      this.aid = list[0]['aid']
      return list
    }
  },

  async mounted() {
    setTimeout(() => {
      this.init()
    }, 1000)
  },

  watch: {
    'calendar': function (val, oVal) {
      // this.initAtt()
    }
  },

  methods: {
    init() {
      this.handleMonthSelect(this.calendar)
      this.handleAttSelect(this.aid)
    },
    // 读取项目
    async initAtt() {
      this.loading = true
      const { local, aid } = this
      const [st, et] = this.dateRange

      setTimeout(async () => {
        const attCount = await this.$Api.waitTimes.attractions(local, aid, { st, et })
        this.attCount = attCount

        let avgList = attCount.map(_ => _['waitAvg'])
        avgList = avgList.filter(_ => _ > 0)

        this.attIndex = [
          {
            label: '最低等候',
            value: Math.min(...avgList)
          },
          {
            label: '最高等候',
            value: Math.max(...avgList)
          }
        ]
        this.loading = false
      }, 500)
    },
    // 选择项目
    async handleAttSelect(aid) {
      const { local } = this
      this.aid = aid
      console.log(this.activeAttList)
      this.info = this.activeAttList.find(_ => _.aid === aid)

      // this.attRank =  await this.$Api.waitTimes.attractions(local, aid, { sort: 'wait-avg' })
      this.initAtt()
    },
    // 选择月份
    handleMonthSelect(val) {
      const dateRange = [moment(val, 'YYYY-MM').startOf('month').format('YYYY-MM-DD'), moment(val, 'YYYY-MM').endOf('month').format('YYYY-MM-DD')]

      this.dateRange = dateRange
      this.calendar = val
    }
  }
}
</script>
