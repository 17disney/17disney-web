<style lang='stylus'>
@require '../../styles/disney/var/color.styl';

.calendar-item {
  position: relative;
  height: 50px;

  &__day {
    position: absolute;
    top: 8px;
    left: 8px;
    color: $color-light-grey-s;
  }

  .badge {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    position: absolute;
    right: 8px;
    bottom: 8px;
    cursor: pointer;
  }

  &.is-yellow {
    .badge {
      background-color: $color-yellow;
    }
  }

  &.is-green {
    .badge {
      background-color: $color-green;
    }
  }

  &.is-orange {
    .badge {
      background-color: $color-orange;
    }
  }

  &.is-red {
    .badge {
      background-color: $color-red;
    }
  }
}
</style>
<template>
  <div class="calendar-item" :class="numName.class">
    <p class="calendar-item__day">{{day}}</p>
    <el-tooltip v-if="data && data.waitAvg" effect="dark" :content="data.waitAvg + '分钟'" placement="top">
      <div class="badge"></div>
    </el-tooltip>
    <!-- <att-wait-time :wait="data"></att-wait-time> -->
  </div>
</template>

<script>
import { ATT_WAIT_CLASS } from '@/common/data/const'
export default {
  components: {},

  props: {
    day: [String, Number],
    data: Object
  },

  data() {
    return {
    }
  },

  computed: {

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
        return ATT_WAIT_CLASS['green']
      }
    }


  },

  mounted() { },

  methods: {}
}
</script>
