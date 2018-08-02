<style lang='stylus' scoped>
@require '../../styles/disney/var/color.styl';

.navbar-page {
  margin-top: 20px;
}
</style>
<template>
  <div class="container">
    <navbar-page :data="navbar"></navbar-page>
    <router-view></router-view>
  </div>
</template>

<script>
import NavbarPage from '@/components/Navbar/NavbarPage'

export default {
  components: { NavbarPage },

  props: {
  },

  data() {
    return {
      navbar: [
        {
          label: '首页',
          to: 'home'
        },
        {
          label: '运营日报',
          to: 'day'
        },
        {
          label: '运营月报',
          to: 'month'
        },
        {
          label: '运营年报',
          to: 'year'
        }
      ]
    }
  },

  computed: {},

  mounted() { },

  methods: {}
}
</script>
