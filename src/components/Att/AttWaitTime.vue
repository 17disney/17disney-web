<template>
  <div v-if="wait && wait['waitAvg']">
    <div class="attlist-box__wait" v-if="wait.status == 'Operating'"><strong class="strong">{{wait.waitAvg || 0}}</strong></div>
    <div class="attlist-box__wait color--warn" v-else>
      已关闭
    </div>
  </div>
</template>

<script>
export default {
  props: {
    wait: {
      type: Object
    }
  },
  data() {
    return {
    }
  },

  components: {},

  computed: {},

  mounted() { }

}

</script>

