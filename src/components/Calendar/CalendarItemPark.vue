<style lang='stylus'>
@require '../../styles/disney/var/color.styl'
</style>
<template>
  <div class="calendar-item" :class="[numName.class, {'is-pointer': !tipDisabled}]">
    <p class="calendar-item__day">{{day}}</p>
    <column-park-flow-num :num="data.flowMax"></column-park-flow-num>
    <div v-if="data && data.status" class="badge"></div>
  </div>
</template>

<script>
import { ATT_WAIT_CLASS } from '@/common/data/const'
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
      if (this.data && this.data.waitAvg) {
        const { waitAvg } = this.data
        if (waitAvg < 30) {
          return ATT_WAIT_CLASS['green']
        } else if (waitAvg >= 30 & waitAvg < 60) {
          return ATT_WAIT_CLASS['yellow']
        } if (waitAvg >= 60 & waitAvg < 120) {
          return ATT_WAIT_CLASS['orange']
        } else {
          return ATT_WAIT_CLASS['red']
        }

      } else {
        return ATT_WAIT_CLASS['default']
      }
    }
  }
}
</script>
