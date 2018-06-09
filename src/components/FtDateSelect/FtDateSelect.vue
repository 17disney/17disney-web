<style lang='stylus'>
@require '../../styles/disney/var/color.styl';

.ft-date-select {
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
  border-bottom: 2px solid $color-light-grey-ss;
  transition: 0.15s;

  &:hover {
    border-color: $color-light-grey-s;
  }

  &.is-active {
    border-color: $color-primary;
    color: $color-grey-primary;

    .forecast-item {
      &__num {
        color: $color-primary;
      }

      &__week {
        color: $color-primary;
      }

      &__date {
        color: $color-primary;
      }
    }
  }

  &__week {
    font-size: 14px;
    color: $color-light-grey;
  }

  &__date {
    color: $color-light-grey-s;
    margin-top: 4px;
    font-size: 15px;
  }

  &__num {
    color: #999;
    margin-bottom: 10px;
  }

  &:not(:last-child) {
    &:after {
      // content: '';
      // position: absolute;
      // right: 0px;
      // top: 25px;
      // bottom: 25px;
      // width: 1px;
      // background: $color-light-grey-sss;
    }
  }
}
</style>
<template>
  <div class="ft-date-select">
    <div @click="handleClick(index)" class="forecast-item" :class="{'is-active': item.date === value}" v-for="(item, index) in list">
      <div class="forecast-item__num">
        <park-flow-num :num="item.flowMaxFT"></park-flow-num>
      </div>
      <div class="forecast-item__week">
        {{item.week}}
      </div>
      <div class="forecast-item__date">
        {{item.date | timeFormat($t('ds.dateFormat.monthDay'))}}
      </div>
    </div>
  </div>
</template>

<script>
import ParkFlowNum from '@/components/Park/ParkFlowNum'
import moment from 'moment'

const WEEKS = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']

export default {
  components: { ParkFlowNum },

  props: {
    dates: Array,
    value: String
  },

  data() {
    return {
      list: []
    }
  },

  computed: {},

  mounted() {

  },

  watch: {
    'dates': function (val, oVal) {
      this.init()
    }
  },

  methods: {
    init() {
      const list = []
      this.dates.forEach(item => {
        const { date } = item
        let week = this.$t('el.datepicker.weeks.' + WEEKS[moment(date, 'YYYY-MM-DD').format('e')])

        if (this.$lang === 'zh-hans') {
          week = '星期' + week
        }
        list.push({
          date,
          week
        })
      })
      this.list = list
    },
    handleClick(value) {
      this.$emit('click', value)
    }
  }
}
</script>
