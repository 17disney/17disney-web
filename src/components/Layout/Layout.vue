<style lang="stylus">
@require '../../styles/disney/var/color.styl';

.layout {
  margin: 0 auto;
}

.ds-first {
  background-repeat: no-repeat;
  background-position: center;
  position: relative;
  background-color: #FFF;

  &__cover {
    position: absolute;
    left: 0px;
    top: 0px;
    right: 0px;
    bottom: 0px;
    z-index: 10;
    background: rgba($color-primary, 0.45);
  }

  &.is-live {
    .container {
      height: 800px;

      .text-wrap {
        display: none;
      }
    }

    .ds-first__cover {
      display: none;
    }
  }

  .container {
    height: 350px;
    padding-top: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    z-index: 111;
    position: relative;
    color: #FFF;
    text-align: center;
  }

  &__icon {
    font-size: 70px;
    text-shadow: 0px 1px 5px rgba($color-grey, 0.87);
  }

  &__title {
    font-size: 23px;
    font-weight: 500;
    text-shadow: 0px 1px 5px rgba($color-grey, 0.87);
    letter-spacing: 2px;
  }

  .card-forecast {
    bottom: 0px;
    left: 0px;
    right: 0px;
    position: absolute;
  }

  .ds-tab-home {
    margin-top: 45px;
  }
}
</style>

<template>
  <div class="layout">
    <layout-header></layout-header>
    <!-- <div class="ds-first" :class="{'is-live': isLive}">
      <div class="ds-first__cover"></div>
      <div class="container">
        <div class="text-wrap">
          <div class="ds-first__icon icon--pep" :class="'icon__' + localInfo.icon "></div>
          <h1 class="ds-first__title">{{$t('ds.disneyLand.' + local)}}</h1>
          <ds-tab-home :routes="homeTab"></ds-tab-home>
        </div>
      </div>
      <ds-map :local="local" :center="localInfo.coordinates"></ds-map>
    </div> -->
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
import LOCAL from 'packages/17disney-common/const/local'
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
        'name': this.$t('ds.label.flowForecast'),
        'icon': 'business-excellence',
        'to': '/forecast'
      })
    }

    homeTab.push({
      'name': this.$t('ds.label.historicalWait'),
      'icon': 'magic-morning',
      'to': '/history'
    })

    this.homeTab = homeTab
    this.localInfo = LOCAL.find(_ => _.value === local)
  },

  data() {
    return {
      homeTab: [],
      localInfo: {},
      isLive: true
    }
  },
  computed: {

  }
}
</script>
