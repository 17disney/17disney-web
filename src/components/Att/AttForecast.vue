<style lang='stylus'>
</style>
<template>
  <div class="att-forecast">
    <div class="att-forecast__num" v-if="forecast">
      {{forecast.waitAvg}} 分钟
    </div>
    <div v-else>暂无数据</div>
  </div>
</template>

<script>
export default {
  components: {},

  props: {
    forecast: Object
  },

  data() {
    return {
    }
  },

  computed: {},

  mounted() { },

  methods: {}
}
</script>
