<template>
  <div class="layout">
    <layout-header></layout-header>
    <div class="ds-first">
      <div class="ds-first__cover"></div>
      <div class="container">
        <div class="ds-first__icon icon--pep" :class="'icon__' + localInfo.icon "></div>
        <h1 class="ds-first__title">{{$t('ds.disneyLand.' + local)}}</h1>
        <ds-tab-home :routes="homeTab"></ds-tab-home>
      </div>
      <ds-map :local="local" :center="localInfo.coordinates"></ds-map>
    </div>

    <div class="layout-main">
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
    <layout-footer></layout-footer>
  </div>
</template>

<script>
import LayoutHeader from '@/components/Layout/LayoutHeader'
import LayoutFooter from '@/components/Layout/LayoutFooter'
import DsMap from '@/components/DsMap/DsMap.vue'
import DsTabHome from '@/components/DsTab/DsTabHome'
import LOCAL from 'package/17disney-common/const/local'
import base from '@/common/mixins/base'

export default {
  name: 'layout',

  mixins: [base],

  components: {
    LayoutHeader, LayoutFooter, DsMap, DsTabHome
  },

  mounted() {
    const { local } = this

    const homeTab = []

    if (local === 'shanghai') {
      homeTab.push({
        'name': '客流预测',
        'icon': 'business-excellence',
        'to': '/forecast'
      })
    }

    homeTab.push({
      'name': '历史等候',
      'icon': 'magic-morning',
      'to': '/history'
    })

    this.homeTab = homeTab
    this.localInfo = LOCAL.find(_ => _.value === local)
  },

  data() {
    return {
      homeTab: [],
      localInfo: {}
    }
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
