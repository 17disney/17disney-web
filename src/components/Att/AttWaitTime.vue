<style lang="stylus">
.att-wait-time {
  &__text {
    font-size: 14px;
  }
}
</style>

<template>
  <div class="att-wait-time" v-if="wait && wait['waitAvg']">
    <div class="att-wait-time__num" v-if="wait.status == 'Operating'">
      <span class="att-wait-time__text" v-if="text">等候</span>
      <strong class="strong">{{wait.waitAvg || 0}}</strong>
      <span class="att-wait-time__text" v-if="text">分钟</span>
    </div>
    <div class="att-wait-time__text is-red" v-else>
      已关闭
    </div>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: Boolean,
      default: false
    },
    wait: {
      type: Object
    }
  },
  data() {
    return {
    }
  },

  components: {},

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

  mounted() { }

}

</script>

