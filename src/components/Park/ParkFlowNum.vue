<style lang='stylus'>
@require '../../styles/disney/var/color.styl';

.park-flow-num {
  display: flex;
  flex-direction: column;

  .num-good {
    font-size: 20px;
    margin-bottom: 5px;
  }

  .num {
    font-size: 18px;
    margin-bottom: 5px;
  }

  .text {
    color: #FFF;
    width: 50px;
    font-size: 14px;
    line-height: 1.5;
    border-radius: 14px;
    margin: 0 auto;
  }

  &.is-yellow {
    .text {
      background-color: $color-yellow;
    }
  }

  &.is-green {
    .text {
      background-color: $color-green;
    }
  }

  &.is-orange {
    .text {
      background-color: $color-orange;
    }
  }

  &.is-red {
    .text {
      background-color: $color-red;
    }
  }
}
</style>
<template>
  <div class="park-flow-num" :class="numName.class">
    <div class="num">{{num}}</div>
    <!-- <div class="num-good">{{num | numGood}}</div> -->
    <div class="text">{{numName.name}}</div>
  </div>
</template>

<script>

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
  filters: {

    numGood(val) {

      return (val / 10000).toFixed(1) + '万人'
    }
  },

  props: {
    num: Number
  },

  data() {
    return {

    }
  },

  computed: {
    numName() {
      const { num } = this
      if (num < 30000) {
        return INDEX_TYPE['green']
      } else if (num >= 30000 & num < 45000) {
        return INDEX_TYPE['yellow']
      } if (num >= 45000 & num < 60000) {
        return INDEX_TYPE['orange']
      } else {
        return INDEX_TYPE['red']
      }
    }
  },

  mounted() { },

  methods: {}
}
</script>
