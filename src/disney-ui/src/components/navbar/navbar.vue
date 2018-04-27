<style lang="stylus">
@require '../../common/stylus/variable.styl';
@require '../../common/stylus/mixin.styl';

.ds-navbar {
  background-color: #FFF;
  display: flex;
  text-align: center;

  &.is-fixed {
    top: 0;
    right: 0;
    left: 0;
    position: fixed;
    z-index: 1;
  }

  .ds-tab__item {
    padding: 17px 0;
    font-size: 18px;
    border-bottom: 3px solid $color-light-grey-s;
    color: $color-primary;

    &:last-child {
      border-right: 0;
    }

    &.is-selected {
      border-color: $color-primary;
      font-weight: 600;
      color: $color-primary-dark;
    }
  }
}
</style>

<template>
  <div class="ds-navbar" :class="{ 'is-fixed': fixed }">
    <slot></slot>
  </div>
</template>

<script>
const COMPONENT_NAME = 'ds-navbar'

export default {
  name: COMPONENT_NAME,

  props: {
    fixed: Boolean,
    value: {}
  }
};
</script>


