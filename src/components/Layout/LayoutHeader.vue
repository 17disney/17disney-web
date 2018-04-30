<style lang="stylus">
@require '../../styles/disney/var/color.styl';

.header {
  height: 80px;
  // background-color: $color-primary;
  color: #fff;
  top: 0;
  left: 0;
  width: 100%;
  line-height: 80px;
  z-index: 100;
  position: relative;
  overflow: hidden;
  position: absolute;
  z-index: 200;

  .container {
    height: 100%;
    box-sizing: border-box;
  }

  .logo {
    margin: 0;
    float: left;
    font-size: 32px;
    font-weight: 400;
  }

  .nav {
    float: right;
    height: 100%;
    line-height: 80px;
    background: transparent;
    padding: 0;
    margin: 0;
  }

  .nav-item {
    margin: 0;
    float: left;
    list-style: none;
    position: relative;
    cursor: pointer;

    a {
      font-size: 17px;
      text-decoration: none;
      color: #FFF;
      display: block;
      padding: 0 22px;
    }
  }
}
</style>

<template>
  <div class="header">
    <div class="container">
      <h1 class="logo">
        <logo-text></logo-text>
      </h1>
      <ul class="nav">
        <li class="nav-item">
          <a href="">上海迪士尼乐园</a>
        </li>
        <li class="nav-item">
          <a href="">小程序</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import LogoText from './LogoText.vue'

export default {
  components: { LogoText },

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
