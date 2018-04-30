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
  <div class="container ds-main">
    <el-card class="card-forecast">
      <div class="forecast-park">
        <div @click="handleClickDate(index)" class="forecast-item" :class="{'is-active': item.date === date}" v-for="(item, index) in forecast">
          <div class="forecast-item__date">
            {{item.date | timeFormat('M月D日')}}
          </div>
          <div class="forecast-item__date">
            星期{{item.date | timeFormat('d')}}
          </div>
          <div class="forecast-item__date">
            <park-flow-num :num="item.flowMaxFT"></park-flow-num>
          </div>
        </div>
      </div>

    </el-card>
    <el-card class="card-forecast">
      {{attractions}}
      {{date}}
      <div class="forecast-att">
        <div class="forecast-att-item" v-for="item, index in FtAttList">
          {{item.name}}
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import base from '@/common/mixins/base'
import Forecast from '@/common/api/forecast'
import ParkFlowNum from '@/components/Park/ParkFlowNum'

export default {
  components: { ParkFlowNum },

  mixins: [base],
  data() {
    return {
      forecast: [],
      aid: 'attExplorerCanoes',
      date: null,
      attractions: null
    }
  },

  computed: {
    FtAttList() {
      return this.attListFilter('attraction', 4)
    },
  },

  async mounted() {
    this.getDestinationsList()
    const data = await Forecast.forecastReport('shanghai')
    this.forecast = data
    this.handleClickDate(0)
  },

  methods: {

    handleClickDate(index) {
      const { date, attractions } = this.forecast[index]
      this.date = date
      this.attractions = attractions
    }

  }
}
</script>
