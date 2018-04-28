<template>
  <div class="layout">
    <layout-header></layout-header>
    <div class="layout-main">
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import LayoutHeader from '@/components/Layout/LayoutHeader'
export default {
  name: 'layout',
  components: {
    LayoutHeader
  },
  computed: {

  }
}
</script>

<style lang="stylus">
.layout {
  &-main {
    overflow: hidden;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }

  &-content {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    position: relative;
    height: 100%;
    overflow: auto;
  }

  &-footer {
  }
}
</style>
