<style lang='stylus'>
@require '../../styles/disney/var/color.styl';

.select-daterange {
  display: flex;

  &-item {
    flex: 1;
    height: 100px;
    text-align: center;
    cursor: pointer;
    text-align: center;
    justify-content: center;
    align-items: center;
    padding: 15px;
    border-bottom: 6px solid $color-light-grey-ss;
    color: $color-grey;
    position: relative;

    &:not(:last-child) {
      &:after {
        content: '';
        position: absolute;
        right: 0px;
        top: 15px;
        bottom: 15px;
        width: 1px;
        background: $color-light-grey-sss;
      }
    }

    &__year {
      padding-bottom: 6px;
      margin-bottom: 6px;
      font-size: 16px;
    }

    &__month {
      background-color: $color-light-grey-s;
      color: #FFF;
      font-size: 14px;
      line-height: 25px;
      border-radius: 5px;
    }

    &:hover {
      color: $color-primary;
    }

    &.is-active {
      border-color: $color-primary;
      color: $color-primary;
      font-weight: 600;
      .select-daterange-item__month {
        background-color: $color-primary;
      }
    }
  }
}
</style>
<template>
  <div class="select-daterange">
    <div @click="handleClick(item)" class="select-daterange-item" :class="{'is-active': select === item}" v-for="item, index in list" :key="index">
      <div class="select-daterange-item__year">
        {{item | timeFormat('YYYY年', 'YYYY-MM')}}
      </div>
      <div class="select-daterange-item__month">
        {{item | timeFormat('MM月', 'YYYY-MM')}}
      </div>

    </div>

  </div>
</template>

<script>
import moment from 'moment'
export default {
  components: {},

  props: {
    select: String
  },

  data() {
    return {
      st: '2017-04',
      et: '2018-04',
      list: []
    }
  },

  computed: {},

  mounted() {
    const list = []
    let i = 0
    while (1) {
      let m = moment(this.st, 'YYYY-MM').add(i, 'months').format('YYYY-MM')
      list.push(m)
      if (m === this.et) {
        break
      }
      i++
    }
    this.list = list
  },

  methods: {
    handleClick(val) {
      const dateRange = [moment(val, 'YYYY-MM').startOf('month').format('YYYY-MM-DD'), moment(val, 'YYYY-MM').endOf('month').format('YYYY-MM-DD')]
      this.$emit('click', dateRange)
    }
  }
}
</script>
