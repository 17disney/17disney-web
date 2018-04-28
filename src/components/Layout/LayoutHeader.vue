<style lang="stylus">
@require '../../styles/disney/var/color.styl';

.header {
  height: 80px;
  background-color: $color-primary;
  color: #fff;
  top: 0;
  left: 0;
  width: 100%;
  line-height: 80px;
  z-index: 100;
  position: relative;

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
      font-size: 20px;
      text-decoration: none;
      color: #FFF;
      display: block;
      padding: 0 22px;
    }
  }
}

html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*, *:before, *:after {
  box-sizing: border-box;
  margin: 0;
}
</style>

<template>
  <div class="header">
    <div class="container">
      <h1 class="logo">17disney</h1>
      <ul class="nav">
        <li class="nav-item">
          <a href="">首页</a>
        </li>
        <li class="nav-item">
          <a href="">等候时间</a>
        </li>
        <li class="nav-item">
          <a href="">时间表</a>
        </li>
        <li class="nav-item">
          <a href="">预测</a>
        </li>
      </ul>
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
