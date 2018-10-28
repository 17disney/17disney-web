<style lang='stylus' scoped>
.dm-header {
  // margin: 0 32px;
  padding: 32px 24px;
  overflow: hidden;
  background: #FFF;

  &.is-border {
    $:after {
      left: 24px;
      right: 24px;
      height: 1px;
      bottom: 0px;
      background: #DDD;
    }
  }
}
</style>
<template>
  <header class="dm-header" :class="{'is-border': border}">
    <slot></slot>
  </header>
</template>

<script>
export default {
  name: 'dm-header',

  components: {},

  props: {
    border: {
      type: Boolean,
      default: false
    }
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
