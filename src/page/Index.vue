<style lang='stylus'>
.ds-main {
  margin-top: 20px;
}

.card-forecast {
  margin-bottom: 20px;
}

.forecast-park {
  display: flex;
}

.forecast-item {
  flex: 1;
  text-align: center;
  display: flex;
  flex-flow: column;
}
</style>
<template>
  <div>
    <div class="ds-first">

      <div class="ds-first__cover">
        <!-- <div class="container">
        <div class="ds-map__icon icon--pep icon__shanghai-disney-resort"></div>
        <h1>上海迪士尼乐园</h1>
      </div> -->
      </div>

      <div class="container">
        <el-card class="card-forecast">
          <div slot="header" class="clearfix">
            <span>客流预测</span>
            <el-button style="float: right; padding: 3px 0" type="text"></el-button>
          </div>
          <div class="forecast-park">
            <div class="forecast-item" v-for="item in forecast">
              <div class="forecast-item__date">
                {{item.date | timeFormat('M月D日')}}
              </div>
              <div class="forecast-item__date">
                星期{{item.date | timeFormat('d')}}
              </div>
              <div class="forecast-item__date">
                {{item.flowMaxFT}}
              </div>
            </div>
          </div>
        </el-card>
      </div>
      <ds-map></ds-map>

    </div>
    <div class="container ds-main">
      <el-card class="card-attcount">
        <el-container>
          <el-aside width="240px">
            <att-list-select @click-item="selectAtt" v-model="aid" :data="activeAttList"></att-list-select>
          </el-aside>
          <el-container>
            <el-main>
              <select-date-range @click="handleClickDateRange"></select-date-range>
              <calendar :data="attCount" :ym="calendar"></calendar>
              <charts-att-count xAxisKey="date" :indexList="['waitAvg']" :data="attCount"></charts-att-count>
            </el-main>
          </el-container>
        </el-container>
      </el-card>
    </div>
  </div>
</template>

<script>
import base from '@/common/mixins/base'
import moment from 'moment'
import { mapState, mapActions, mapGetters } from 'vuex'
import Wait from '@/common/api/wait'
import Forecast from '@/common/api/forecast'
import AttListSelect from '@/components/AttList/AttListSelect'
import DsMap from '@/components/DsMap/DsMap.vue'
import Calendar from '@/components/Calendar/Calendar'
import ChartsAttCount from '@/components/Charts/ChartsAttCount'
import SelectDateRange from '@/components/Select/SelectDateRange'
export default {
  components: { DsMap, AttListSelect, Calendar, ChartsAttCount, SelectDateRange },

  mixins: [base],
  data() {
    return {
      forecast: [],
      aid: 'attExplorerCanoes',
      dateRange: ['2018-04-01', '2018-04-27'],
      attCount: [],
      calendar: '2018-04'
    }
  },

  computed: {
    activeAttList() {
      return this.attListFilter('attraction', 3)
    },
  },

  async mounted() {
    this.getDestinationsList()
    this.initAtt()
    this.forecast = await Forecast.forecastReport('shanghai')
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
