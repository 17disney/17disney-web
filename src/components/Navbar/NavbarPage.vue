<style lang='stylus'>
@require '../../styles/disney/var/color.styl';

.navbar-page {
  height: 40px;
  border: 1px solid $color-primary;
  border-radius: 5px;
  overflow: hidden;

  &-item {
    display: inline-block;
    text-align: center;

    a {
      display: inline-block;
      text-decoration: none;
      font-size: 14px;
      line-height: 40px;
      color: $color-primary;
      padding: 0 20px;

      &.router-link-active {
        background: $color-primary;
        color: #FFF;
      }
    }
  }
}
</style>
<template>
  <div class="navbar-page">
    <div class="navbar-page-item" v-for="(item, index) in data">
      <router-link :to="item.to">
        {{item.label}}
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  components: {},

  props: {
    data: Array
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
