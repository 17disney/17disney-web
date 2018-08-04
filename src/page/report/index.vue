<style lang='stylus' scoped>
@require '../../styles/disney/var/color.styl';

.container {
  // display: flex;
}

.navbar-page {
  margin-top: 20px;
  margin-bottom: 20px;
}


</style>
<template>
  <div class="container">
    <navbar-page :data="navbar"></navbar-page>

    <el-card style="margin-bottom: 20px">
      <year-wait-charts :data="attCount" :date-range="dateRange"></year-wait-charts>
    </el-card>

    <!-- <el-aside width="320px">
      <el-menu default-active="2" class="el-menu-vertical-demo">
        <el-menu-item index="2">
          <i class="el-icon-menu"></i>
          <span slot="title">乐园日报</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-setting"></i>
          <span slot="title">乐园周报</span>
        </el-menu-item>
        <el-menu-item index="5">
          <i class="el-icon-setting"></i>
          <span slot="title">乐园月报</span>
        </el-menu-item>
        <el-menu-item index="6">
          <i class="el-icon-setting"></i>
          <span slot="title">乐园年报</span>
        </el-menu-item>
      </el-menu>

    </el-aside> -->
    <!-- <dm-main> -->
    <router-view></router-view>
    <!-- </dm-main> -->
  </div>
</template>

<script>
import base from '@/common/mixins/base'
import { dateRange } from '@/utils/date'

import NavbarPage from '@/components/Navbar/NavbarPage'
import YearWaitCharts from '@/components/Charts/YearWaitCharts'

export default {
  mixins: [base],

  components: { NavbarPage, YearWaitCharts },

  data() {
    return {
      dateRange: dateRange(-365, 0),
      attCount: [],
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
          label: '运营周报',
          to: 'week'
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

  mounted() {
    this.init()
  },

  methods: {
    async init() {
      const [st, et] = this.dateRange
      const attCount = await this.$Api.waitTimes.park(this.local, { st, et })

      this.attCount = attCount
    }

  }
}
</script>
