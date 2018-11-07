<template>
  <div class="att-wait-time" v-if="wait && wait['waitAvg']">
    <att-mark-num v-if="wait.status == 'Operating'" :label="label" :tail="tail">
      <strong v-if="mode === 'avg'" class="strong">{{wait.waitAvg || 0}}</strong>
      <strong v-else>{{wait.waitList[0][1]}}</strong>
    </att-mark-num>
    <att-mark-num v-else tail="已关闭"></att-mark-num>
  </div>
</template>

<script>
/* eslint-disable */
const NAME = 'att-wait-time'

export default {
  name: NAME,
  props: {
    text: {
      type: Boolean,
      default: false
    },
    mode: {
      type: String,
      default: 'full'
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
    label() {
      if (this.text && this.mode === 'full') {
        return '等候'
      }
    },
    tail() {
      if (this.text) {
        return '分钟'
      }
    },
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

