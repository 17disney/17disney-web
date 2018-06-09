<style lang='stylus'>
.forecast-park {
  display: flex;
  border 1px solid #ccc
}

.forecast-item {
  flex: 1;
  position: relative;
  text-align: center;
  display: flex;
  flex-flow: column;
  color: $color-gray;
  padding: 10px;
  cursor: pointer;
  border-bottom: 6px solid $color-light-grey-ss;
  transition: 0.15s;

  &:hover {
    border-color: $color-light-grey-s;
  }

  &.is-active {
    border-color: $color-primary;
    color: $color-primary;

    .forecast-item {
      &__num {
        color: $color-primary;
      }
    }
  }

  &__week {
    color: $color-light-grey;
  }

  &__date {
    color: $color-light-grey-s;
    margin-top: 4px;
    font-size: 18px;
  }

  &__num {
    color: #999;
    margin-top: 4px;
  }

  &:not(:last-child) {
    &:after {
      content: '';
      position: absolute;
      right: 0px;
      top: 15px;
      bottom: 15px;
      width: 1px;
      background: $color-light-grey-ss;
    }
  }
}
</style>
<template>
  <div class="forecast-park">
    <div @click="handleClick(index)" class="forecast-item" :class="{'is-active': item.date === value}" v-for="(item, index) in dates">
      <div class="forecast-item__week">
        星期{{item.date | timeFormat('d')}}
      </div>
      <div class="forecast-item__date">
        {{item.date | timeFormat('M月D日')}}
      </div>
      <div class="forecast-item__num">
        <park-flow-num :num="item.flowMaxFT"></park-flow-num>
      </div>
    </div>
  </div>
</template>

<script>
import ParkFlowNum from '@/components/Park/ParkFlowNum'

export default {
  components: { ParkFlowNum },

  props: {
    dates: Array,
    value: String
  },

  data() {
    return {
    }
  },

  computed: {},

  mounted() { },

  methods: {
    handleClick(value) {
      this.$emit('click', value)
    }
  }
}
</script>
