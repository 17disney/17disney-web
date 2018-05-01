<template>
  <div class="layout">
    <layout-header></layout-header>
    <div class="ds-first">
      <div class="ds-first__cover"></div>
      <div class="container">
        <div class="ds-first__icon icon--pep icon__shanghai-disney-resort"></div>
        <h1 class="ds-first__title">上海迪士尼乐园</h1>
        <ds-tab-home :routes="homeTab"></ds-tab-home>
      </div>
      <ds-map></ds-map>
    </div>

    <div class="layout-main">
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
    <div class="footer">
      <div class="container">
        <div class="wxapp-list">
          <div class="wxapp-list-item">
            <img class="wxapp-list-item__img" src="static/wxapp_17disney.jpg" alt="">
            <div class="wxapp-list-item__name">微信小程序</div>
            <div class="wxapp-list-item__desc">17俱乐部</div>
          </div>



          <div class="wxapp-list-item">
            <img class="wxapp-list-item__img" src="static/wx_17shenqi.jpg" alt="">
            <div class="wxapp-list-item__name">公众号</div>
            <div class="wxapp-list-item__desc">一起神奇</div>
          </div>

          <div class="wxapp-list-item">
            <img class="wxapp-list-item__img" src="static/wxapp_timesguide.jpg" alt="">
            <div class="wxapp-list-item__name">微信小程序</div>
            <div class="wxapp-list-item__desc">乐园时间表</div>
          </div>
        </div>
        <div class="footer__text">
          ©2018 17disney · 一起迪士尼
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LayoutHeader from '@/components/Layout/LayoutHeader'
import DsMap from '@/components/DsMap/DsMap.vue'
import DsTabHome from '@/components/DsTab/DsTabHome'
export default {
  name: 'layout',
  components: {
    LayoutHeader, DsMap, DsTabHome
  },
  data() {
    return {
      homeTab: [
        {
          'name': '客流预测',
          'icon': 'business-excellence',
          'to': '/forecast'
        },
        {
          'name': '历史等候',
          'icon': 'magic-morning',
          'to': '/history'
        }
      ]
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
