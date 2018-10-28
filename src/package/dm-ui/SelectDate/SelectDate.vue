<style lang='stylus'>
@require '../../../styles/disney/var/color.styl';

$height = 68px;

.att-date-select {
  display: flex;
  border: 1px solid $color-light-grey-sss;
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
    border-left: 1px solid $color-light-grey-sss;
    border-right: 1px solid $color-light-grey-sss;
  }

  &__list {
    position: absolute;
    width: 100%;
    display: flex;
    &.active{
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
    border-left: 1px solid $color-light-grey-sss;
    cursor: pointer;
    height: $height;
    transition: 0.3s;
    color: #999;

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

  &__date {
    font-size: 17px;
    margin-bottom: 5px;
  }

  &__week {
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
      <select-date-list v-show="status === 'list'" @click="handleClick" :list="list" v-model="value"></select-date-list>
      <select-date-list v-show="status === 'prev'" @click="handleClick" :list="prev" v-model="value"></select-date-list>
      <select-date-list v-show="status === 'next'" @click="handleClick" :list="next" v-model="value"></select-date-list>
    </div>

    <div @click="clickBtn('next')" class="att-date-select__btn btn-after">
      <att-icon name="next"></att-icon>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import SelectDateList from './SelectDateList'

const DATE_FORMAT = 'YYYY-MM-DD'
const WEEKS = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']

export default {
  name: 'dm-select-date',

  components: { SelectDateList },


  props: {
    value: String
  },

  data() {
    return {
      list: [],
      prev: [],
      next: [],
      status: 'list'
    }
  },

  computed: {

  },

  mounted() {
    this.init()
  },

  methods: {
    init() {
      this.initList()
    },

    initList(value, type = 'list') {
      const val = value || this.value
      const date = moment(val, DATE_FORMAT)
      const dateList = [date]
      const list = []

      // 当前日期前后加 3
      for (let i = 1; i <= 3; i++) {
        let _date = moment(date).add(i, 'day')
        dateList.push(_date)
        _date = moment(date).subtract(i, 'day')
        dateList.unshift(_date)
      }

      dateList.forEach(item => {
        list.push({
          view: moment(item).format(this.$t('ds.selectDate.dateformat')),
          week: WEEKS[moment(item).format('e')],
          value: moment(item).format(DATE_FORMAT)
        })
      })
      this[type] = list
    },

    clickBtn(type) {
      var value
      if (type === 'previous') {
        value = moment(this.list[3]['value'], DATE_FORMAT).subtract(7, 'day').format(DATE_FORMAT)
        this.initList(value, 'list')

        // this.status = 'prev'
        // setTimeout(() => {
        //   this.list = this.prev
        //   this.prev = []
        //   this.status = 'list'
        // }, 500)
      } else {
        value = moment(this.list[3]['value'], DATE_FORMAT).add(7, 'day').format(DATE_FORMAT)
        this.initList(value, 'list')

        // this.status = 'next'
        // setTimeout(() => {
        //   this.list = this.next
        //   this.next = []
        //   this.status = 'list'
        // }, 500)
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
