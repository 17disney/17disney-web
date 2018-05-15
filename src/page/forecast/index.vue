<style lang='stylus'>
@require '../../styles/disney/var/color.styl';

.ds-main {
  margin-top: 16px;
}

.forecast-park {
  display: flex;
}

.forecast-item {
  flex: 1;
  position: relative;
  text-align: center;
  display: flex;
  flex-flow: column;
  color: $color-gray;
  padding: 10px;
  cursor: pointer;
  border-bottom: 6px solid $color-light-grey-ss;
  transition: 0.15s;

  &:hover {
    border-color: $color-light-grey-s;
  }

  &.is-active {
    border-color: $color-primary;
    color: $color-primary;
    .forecast-item{
      &__num{
        color: $color-primary;
      }
    }
  }

  &__week {
    color: $color-light-grey;
  }

  &__date {
    color: $color-light-grey-s;
    margin-top: 4px;
    font-size: 18px;
  }

  &__num {
    color: #999
    margin-top: 4px;
  }

  &:not(:last-child) {
    &:after {
      content: '';
      position: absolute;
      right: 0px;
      top: 15px;
      bottom: 15px;
      width: 1px;
      background: $color-light-grey-ss;
    }
  }
}
</style>
<template>
  <div class="container ds-main">
    <div class="ds-card" style="margin-bottom: 16px">
      <div class="forecast-park">
        <div @click="handleClickDate(index)" class="forecast-item" :class="{'is-active': item.date === date}" v-for="(item, index) in forecast">
          <div class="forecast-item__week">
            星期{{item.date | timeFormat('d')}}
          </div>
          <div class="forecast-item__date">
            {{item.date | timeFormat('M月D日')}}
          </div>
          <div class="forecast-item__num">
            <park-flow-num :num="item.flowMaxFT"></park-flow-num>
          </div>
        </div>
      </div>
    </div>
    <div class="ds-card">
      <!-- <att-list-table :data="FtAttList" :date="date" :forecast="attractions"></att-list-table> -->
      <att-list :data="FtAttList" :date="date" :forecast="attractions"></att-list>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import base from '@/common/mixins/base'
import Forecast from '@/common/api/forecast'
import ParkFlowNum from '@/components/Park/ParkFlowNum'
import AttListTable from '@/components/AttList/AttListTable'
import AttList from '@/components/AttList/AttList'
export default {
  components: { ParkFlowNum, AttListTable, AttList },

  mixins: [base],
  data() {
    return {
      forecast: [],
      date: null,
      attractions: null
    }
  },

  computed: {
    FtAttList() {
      return this.attListFilter('attraction', 3)
    },
  },

  async mounted() {
    this.getDestinationsList()
    const data = await Forecast.forecastReport('shanghai')
    this.forecast = data['data']
    this.handleClickDate(0)
  },

  methods: {
    handleClickDate(index) {
      const { date, attractions } = this.forecast[index]
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
