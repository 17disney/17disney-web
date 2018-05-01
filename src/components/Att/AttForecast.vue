<style lang='stylus'>
@require '../../styles/disney/var/color.styl';

.att-forecast {
  display: flex;
  align-items: center;

  .badge {
    width: 12px;
    height: 12px;
    display: inline-block;
    border-radius: 50%;
    vertical-align: middle;
    position: relative;
    margin-right: 16px;
  }

  &__num {
    font-size: 18px;
    color: $color-grey;

    strong {
      // font-size: 20px;
    }
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
  <!-- <div class="att-forecast">
    <div class="att-forecast__num" v-if="forecast">
      {{forecast.waitAvg}} 分钟
    </div>
    <div v-else>暂无数据</div>
  </div> -->

  <div class="att-forecast" :class="numName.class">
    <div class="badge"></div>
    <div class="att-forecast__num">
      <strong>{{forecast.waitAvg}}</strong> 分钟</div>
    <!-- <div class="num-good">{{num | numGood}}</div> -->
    <!-- <div class="text">{{numName.name}}</div> -->
  </div>

</template>

<script>
import { ATT_WAIT_CLASS } from '@/common/data/const'
const INDEX_TYPE = {
  'green': {
    name: '舒适',
    class: 'is-green'
  },
  'yellow': {
    name: '适中',
    class: 'is-yellow'
  },
  'orange': {
    name: '拥挤',
    class: 'is-orange'
  },
  'red': {
    name: '爆满',
    class: 'is-red'
  }
}

export default {
  components: {},

  props: {
    forecast: Object
  },

  data() {
    return {
    }
  },

  computed: {
    numName() {
      const num = this.forecast.waitAvg
      if (num < 30) {
        return INDEX_TYPE['green']
      } else if (num >= 30 & num < 60) {
        return INDEX_TYPE['yellow']
      } if (num >= 60 & num < 120) {
        return INDEX_TYPE['orange']
      } else {
        return INDEX_TYPE['red']
      }
    }
  },

  mounted() {

  },

  methods: {}
}
</script>
