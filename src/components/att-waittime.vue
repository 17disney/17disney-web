<template>
  <div v-if="wait && wait['waitList']">
    <div class="attlist-box__wait" v-if="wait.status == 'Operating'">等候<strong class="strong">{{wait.waitList[0][1] || 0}}</strong>分钟</div>
    <div class="attlist-box__wait color--warn" v-else>
      已关闭
    </div>
    <div v-if="wait.fpList">
      <div class="attlist-box__fp" v-if="wait.fpStatus">
        FP 使用时间： {{wait.fpStartTime}} 至 {{wait.fpEndTime}}
      </div>
      <div class="attlist-box__fp color--warn" v-else>
        FP 已领完
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    wait: {
      type: Object
    },
    item: {
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
<style lang='less'>

</style>
