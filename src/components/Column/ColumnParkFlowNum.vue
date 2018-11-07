<style lang='stylus'>
@require '~@/styles/disney/var/color.styl';

.column-park-flow-num {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;

  .bardge {
    width: 8px;
    height: 8px;
    border-radius: 100%;
    margin: 0 auto;

    &.is-yellow {
      background-color: $color-yellow;
    }

    &.is-green {
      background-color: $color-green;
    }

    &.is-orange {
      background-color: $color-orange;
    }

    &.is-red {
      background-color: $color-red;
    }
  }
}
</style>
<template>
  <div class="column-park-flow-num">
    <!-- <div class="num">{{num}}</div> -->
    <!-- <div class="num-good">{{num | numGood}}</div> -->
    <div class="bardge" :class="numName.class"></div>
    <!-- {{numName.name}} -->
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
