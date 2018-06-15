<style lang='stylus'>
@require '../../styles/disney/var/color.styl';

.ft-section-list {
  .ft-section {
    &:last-child {
      border: none;
    }
  }

  &__title {
    color: $color-grey;
    border-bottom: 1px solid $color-light-grey-ss;
    padding-bottom: 35px;
    margin-bottom: 35px;
    line-height: 23px;
    font-size: 23px;
  }
}
</style>
<template>
  <div class="ft-section-list">
    <slot></slot>
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
