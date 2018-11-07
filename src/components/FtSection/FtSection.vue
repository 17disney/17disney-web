<style lang='stylus'>
@require '~@/styles/disney/var/color.styl';

.ft-section {
  display: flex;
  border-bottom: 1px solid $color-light-grey-ss;
  padding-top: 30px;
  padding-bottom: 30px;

  &__header {
    width: 250px;
    color: $color-grey;
    font-size: 18px;
    font-weight: 600;
  }

  &__body {
    flex: 1;
  }
}
</style>
<template>
  <div class="ft-section">
    <div class="ft-section__header">
      <slot name="header"></slot>
    </div>
    <div class="ft-section__body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  components: {},

  props: {
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
