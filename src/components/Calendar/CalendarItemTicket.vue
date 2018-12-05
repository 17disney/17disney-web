<style lang='stylus'>
@require '~@/styles/disney/var/color.styl';

.popover-att {
  padding: 10px 0 !important;
  text-align: center;

  &__charts {
    width: 200px !important;
    margin: 10px auto;
    margin-top: 15px;
  }

  &__schedule {
    color: $color-grey;
  }

  &__num {
    display: flex;
    width: 185px;
    margin: 0 auto;
    margin-bottom: 10px;
    font-size: 13px;
    color: $color-grey;
  }

  &__wait {
    flex: 1;
    text-align: left;
  }
}
</style>

<template>
  <div
    class="calendar-item"
    :class="[className]"
  >
    <!-- {{data.availableCount}} -->
    <p class="calendar-item__day">{{day}}</p>
    <div class="badge"></div>
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

  data() {
    return {
      tipDisabled: true,
      id: Math.random()
    }
  },

  computed: {
    className() {
      const {ticketNum = 0} = this.data
      const value = ticketNum
      let color

      TICKET_INDEX_MAP.forEach(item => {
        const {gt, lte, className: _color} = item

        if (gt && lte) {
          if (value >= gt && value <= lte) {
            color = _color
          }
        } else {
          if (value >= gt) color = _color
        }
      })

      console.log(color)

      return color
    }
  }
}
</script>
