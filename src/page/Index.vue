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
    <ds-map></ds-map>
    <div class="container ds-main">
      <el-card class="card-forecast">
        <div slot="header" class="clearfix">
          <span>客流预测</span>
          <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
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

      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>历史等候时间</span>
          <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
        </div>
        <el-container>
          <el-aside width="240px">
            <att-list-select @click-item="selectAtt" v-model="aid" :data="activeAttList"></att-list-select>
          </el-aside>
          <el-container>
            <el-main>
              <calendar year="2018" month="04"></calendar>

            </el-main>
          </el-container>
        </el-container>

      </el-card>
    </div>
  </div>
</template>

<script>
import AttListSelect from '@/components/AttList/AttListSelect'
import { mapState, mapActions, mapGetters } from 'vuex'
import DsMap from '@/components/DsMap/DsMap.vue'
import Calendar from '@/components/Calendar/Calendar'
import Forecast from '@/common/api/forecast'
import moment from 'moment'
import base from '@/common/mixins/base'
import Wait from '@/common/api/wait'

export default {
  components: { DsMap, AttListSelect, Calendar },

  mixins: [base],
  data() {
    return {
      forecast: [],
      aid: 'attExplorerCanoes',
      dateRang: ['2018-04-01', '2018-04-27'],
      attCount: []
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
      const [st, et] = this.dateRang

      this.attCount = await Wait.attractionsIdCount(local, aid, { st, et })
    },

    selectAtt(id) {
      console.log(id)

      this.aid = id
      this.initAtt()
    }

  }
}
</script>
