<style lang='stylus'>
@require '../../styles/disney/var/color.styl';

.select-daterange {
  display: flex;

  &-item {
    border: 1px solid $color-primary;
    margin 10px
  }
}
</style>
<template>
  <div class="select-daterange">
    <div @click="handleClick(item)" class="select-daterange-item" v-for="item, index in list" :key="index">
      {{item}}
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
