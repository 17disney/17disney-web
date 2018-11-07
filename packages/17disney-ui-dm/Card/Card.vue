<style lang='stylus'>
@require '../../../styles/disney/var/color.styl';

.dm-card {
  &--charts {
    .dm-card {
      &__header {
        padding-bottom: 18px;
        margin-bottom: 18px;
        border-bottom: 1px solid $color-light-grey-ss;
      }
    }
  }

  &__header {
    color: $color-grey;

    span {
      margin-bottom: 20px;
      padding-bottom: 30px;
      font-size: 17px;
      font-weight: 600;
    }
  }

  &--report {
    margin-bottom: 20px;
    padding: 20px;
    border: 1px solid $color-primary-s;
    border-radius: 10px;

    .dm-card {
      &__header {
      }
    }
  }
}
</style>
<template>
  <div class="dm-card" :class="'dm-card--' + type">
    <div class="dm-card__header">
      <slot name="header"></slot>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'dm-card',
  components: {},

  props: {
    type: String
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
