<style lang='stylus'>
@require '../../styles/disney/var/color.styl';

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
  <el-popover popper-class="popover-att" :disabled="tipDisabled" placement="top" width="220" trigger="hover">
    <div v-if="data.waitAvg > 0">
      <div class="popover-att__num">
        <div class="popover-att__wait">
          {{tipContent}}
        </div>
        <att-status v-if="data.status" :status="data.status"></att-status>
      </div>
      <charts-att-base v-if="data && data.waitHour" class="popover-att__charts" :id="'att' + id" :data="data.waitHour"></charts-att-base>
      <div class="popover-att__schedule" v-if="data">{{data.startTime}} - {{data.endTime}}</div>
    </div>
    <div v-else>未开放</div>
    <div slot="reference">
      <div class="calendar-item" :class="[numName.class, {'is-pointer': !tipDisabled}]">
        <p class="calendar-item__day">{{day}}</p>
        <div v-if="data && data.status" class="badge"></div>
      </div>
    </div>
  </el-popover>
</template>

<script>
import { ATT_WAIT_CLASS } from '@/common/data/const'
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


  },

  mounted() { },

  methods: {}
}
</script>
