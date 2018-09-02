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
  height: 1000px;
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
      <ft-section-list>
        <h2 class="ft-section-list__title">{{info.name || '——————'}}</h2>
        <select-month @click="handleMonthSelect" v-model="calendar"></select-month>
        <ft-section>
          <div slot="header" class="clearfix">
            <span>{{$t('ds.label.waitsCalendar')}}</span>
          </div>
          <calendar v-loading="loading" :data="attCount" :ym="calendar"></calendar>
        </ft-section>
        <ft-section>
          <div slot="header" class="clearfix">
            <span>{{$t('ds.label.waitsTrend')}}</span>
          </div>
          <charts-att-count v-loading="loading" :data="attCount"></charts-att-count>
        </ft-section>
      </ft-section-list>
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
/*
+-----------------------------------------------------------------------------------------------------------------------
| Author: xank <xank@qq.com>  Blog：https://www.xank.cn
+-----------------------------------------------------------------------------------------------------------------------
| History - index
| 历史查询 - 主页
*/

import { mapState, mapActions, mapGetters } from 'vuex'
import base from '@/common/mixins/base'
import moment from 'moment'

import FtIndex from '@/components/FtIndex/FtIndex'
import AttListSelect from '@/components/AttList/AttListSelect'
import Calendar from '@/components/Calendar/Calendar'
import CalendarItem from '@/components/Calendar/CalendarItem'
import ChartsAttCount from '@/components/Charts/ChartsAttCount'
import SelectDateRange from '@/components/Select/SelectDateRange'
import FtSection from '@/components/FtSection/FtSection'
import FtSectionList from '@/components/FtSection/FtSectionList'
import SelectMonth from '@/components/SelectMonth/SelectMonth'

export default {
  components: { FtIndex, AttListSelect, Calendar, ChartsAttCount, SelectDateRange, FtSection, FtSectionList, SelectMonth },

  mixins: [base],
  data() {
    return {
      isInit: false,
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
      list.unshift({
        iconName: 'shanghai-disney-resort',
        aid: 'park',
        name: '乐园综合'
      })
      if (list && list[0]) {
        const { aid } = list[0]
        this.aid = aid
        return list
      }
    }
  },

  async mounted() {
    setTimeout(() => {
      // this.init()
    }, 1000)
  },

  watch: {
    'aid': function (val) {
      if (val && !this.isInit) {
        this.init()
      }
    },
    'calendar': function (val, oVal) {
      setTimeout(() => {
        this.initAtt()
      }, 100)
    }
  },

  methods: {
    init() {
      this.handleMonthSelect(this.calendar)
      this.handleAttSelect(this.aid)
      this.isInit = true
    },
    // 读取项目
    async initAtt() {
      const { local, aid } = this
      if (!aid || !local) return

      this.loading = true
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
      this.aid = aid
      this.info = this.activeAttList.find(_ => _.aid === aid)
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
