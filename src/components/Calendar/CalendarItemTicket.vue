<template>
  <div
    class="calendar-item"
    :class="[className]"
  >
    <p class="calendar-item__day">{{day}}</p>
    <transition>
      <div class="badge"></div>
    </transition>
  </div>
</template>

<script>
import { TICKET_INDEX_MAP } from '@/common/data/const'
import ChartsAttBase from '@/components/Charts/ChartsAttBase'

export default {
  components: { ChartsAttBase },

  props: {
    day: [String, Number],
    mode: String,
    data: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },

  computed: {
    className() {
      const { ticketNum = 0 } = this.data
      const value = ticketNum
      let color

      TICKET_INDEX_MAP.forEach(item => {
        const { gt, lte, className: _color } = item

        if (gt && lte) {
          if (value >= gt && value <= lte) {
            color = _color
          }
        } else {
          if (value >= gt) color = _color
        }
      })
      return color
    }
  }
}
</script>
