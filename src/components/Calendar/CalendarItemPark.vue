<style lang='stylus'>
@require '../../styles/disney/var/color.styl'
</style>

<template>
  <div class="calendar-item" :class="[numName.class]">
    <p class="calendar-item__day">{{day}}</p>
    <div v-if="data && data.markMax" class="badge"></div>
    <!-- <column-park-flow-num :num="data.flowMax"></column-park-flow-num> -->
    <!-- <div v-if="data && data.status" class="badge"></div> -->
  </div>
</template>

<script>
import { PARK_MARK_CLASS } from '@/common/data/const'
import ChartsAttBase from '@/components/Charts/ChartsAttBase'
import ColumnParkFlowNum from '@/components/Column/ColumnParkFlowNum'

export default {
  components: { ChartsAttBase, ColumnParkFlowNum },

  props: {
    day: [String, Number],
    data: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },

  data() {
    return {
      tipDisabled: true,
      id: Math.random()
    }
  },

  computed: {
    tipContent() {
      if (this.data && this.data.status) {
        this.tipDisabled = false
        return `${this.data.waitAvg} ${this.$t('ds.label.minute')}`
      } else {
        this.tipDisabled = true
      }
    },

    numName() {
      if (this.data && this.data.markMax) {
        const { markMax: num } = this.data
        // console.log(this.data)
        if (num < 600) {
          return PARK_MARK_CLASS['green']
        } else if (num >= 600 & num < 800) {
          return PARK_MARK_CLASS['yellow']
        } if (num >= 800 & num < 1000) {
          return PARK_MARK_CLASS['orange']
        } else {
          return PARK_MARK_CLASS['red']
        }
      } else {
        return PARK_MARK_CLASS['default']
      }
    }
  }
}
</script>
