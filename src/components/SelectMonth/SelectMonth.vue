<style lang='stylus'>
@require '../../styles/disney/var/color.styl';

$height = 68px;

.att-date-select {
  display: flex;
  border: 1px solid $color-light-grey-ss;
  border-radius: 5px;
  color: $color-primary-dark;

  &__btn {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    cursor: pointer;
    width: 50px;
    height: $height;
    transition: 0.3s;
    font-size: 20px;
    color: #999;

    &:hover {
      color: $color-primary;
    }
  }

  &-list-wrapper {
    flex: 1;
    display: flex;
    position: relative;
    overflow: hidden;
    border-left: 1px solid $color-light-grey-ss;
    border-right: 1px solid $color-light-grey-ss;
  }

  &__list {
    position: absolute;
    width: 100%;
    display: flex;

    &.active {
    }
  }

  &__item {
    display: flex;
    flex: 1;
    position: relative;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    position: relative;
    border-left: 1px solid $color-light-grey-ss;
    cursor: pointer;
    height: $height;
    transition: 0.3s;
    color: $color-grey;

    &:hover {
      color: $color-primary;
    }

    &:first-child {
      border: none !important;
    }

    &.is-active {
      color: $color-primary;
      font-weight: 600;
    }

    .bar {
      left: 0;
      right: 0;
      bottom: 0px;
      position: absolute;
      background: $color-primary;
      opacity: 0.1;
    }
  }

  &__month {
    font-size: 17px;
    margin-bottom: 5px;
  }

  &__year {
    font-size: 15px;
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to { /* .fade-leave-active below version 2.1.8 */
  opacity: 0;
}
</style>
<template>
  <div class="att-date-select">
    <div @click="clickBtn('previous')" class="att-date-select__btn btn-previous">
      <att-icon name="previous"></att-icon>
    </div>

    <div class="att-date-select-list-wrapper">
      <select-month-list v-show="status === 'list'" @click="handleClick" :list="list" v-model="value"></select-month-list>
      <select-month-list v-show="status === 'prev'" @click="handleClick" :list="prev" v-model="value"></select-month-list>
      <select-month-list v-show="status === 'next'" @click="handleClick" :list="next" v-model="value"></select-month-list>
    </div>

    <div @click="clickBtn('next')" class="att-date-select__btn btn-after">
      <att-icon name="next"></att-icon>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import SelectMonthList from './SelectMonthList'

const MONTHS = [null, 'jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
const DATE_FORMAT = 'YYYY-MM'

export default {
  name: 'ft-select-month',

  components: { SelectMonthList },

  props: {
    value: String
  },

  data() {
    return {
      list: [],
      prev: [],
      next: [],
      size: 8,
      status: 'list',
      canNext: false,
      canPrev: true
    }
  },

  mounted() {
    this.init()
  },

  methods: {
    init() {
      this.initList()
    },

    initList(value, type = 'list') {
      const date = value || moment().format(DATE_FORMAT)
      const dateList = [date]
      const list = []

      for (let i = 1; i < this.size; i++) {
        let _date = moment(date).subtract(i, 'month')
        dateList.unshift(_date)
      }

      const MONTH_FORMAT = this.$t('ds.dateFormat.month')

      dateList.forEach(item => {
        const MONTH = MONTHS[moment(item).format('M')]
        list.push({
          view: this.$t('el.datepicker.months.' + MONTH),
          year: moment(item).format('YYYY'),
          value: moment(item).format(DATE_FORMAT)
        })
      })
      this[type] = list
    },

    clickBtn(type) {
      var value
      if (type === 'previous') {
        value = moment(this.list[this.size - 1]['value'], DATE_FORMAT).subtract(this.size, 'month').format(DATE_FORMAT)
        this.initList(value, 'list')
      } else {
        value = moment(this.list[this.size - 1]['value'], DATE_FORMAT).add(this.size, 'month').format(DATE_FORMAT)
        this.initList(value, 'list')
      }
    },

    numHeight(val) {
      let height = val / 50000 * 100
      height = height > 100 ? 100 : height
      return height + '%'
    },

    handleClick(value) {
      this.$emit('click', value)
    }
  }
}
</script>
