<style lang='stylus'>
@require '~@/styles/disney/var/color.styl';

.ds-tab-home {
  position: relative;
  z-index: 200;
  display: flex;
  background: rgba(255, 255, 255, 0.88);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  max-width: 500px;
  width: 500px;
  margin: 0 auto;

  .ds-tab-item, span {
    flex: 1;
    text-align: center;
    display: flex;
    position: relative;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 70px;

    &:not(:last-child) {
      &:after {
        content: '';
        position: absolute;
        right: 0px;
        top: 15px;
        bottom: 15px;
        width: 1px;
        background: $color-light-grey-ss;
      }
    }

    a {
      color: $color-grey;
      text-decoration: none;
      margin-bottom: 2px solid $color-primary;
      transition: 0.5s;
      cursor: pointer;

      &:hover {
        color: $color-primary;
      }

      &.router-link-active {
        // font-weight: 600;
        color: $color-primary;
      }
    }

    &__name {
      font-size: 17px;
    }

    &__icon {
      font-size: 22px;
    }
  }
}
</style>
<template>
  <div class="ds-tab-home">
    <div class="ds-tab-item" v-for="item in routes">
      <router-link :to="item.to">
        <div class="ds-tab-item__icon icon--pep business-excellence" :class="'icon__' + item.icon"></div>
        <div class="ds-tab-item__name">{{item.name}}</div>
      </router-link>
    </div>
    <el-popover popper-class="ds-tab-item" placement="bottom" width="250" trigger="hover">
      <div class="popover-wxapp">
        <img src="/static/wxapp_17disney.jpg" alt="">
        <div class="popover-wxapp__title">{{$t('ds.title.scanMiniProgram')}}</div>
      </div>
      <a slot="reference">
        <div class="ds-tab-item__icon icon--pep icon__current-location"></div>
        <div class="ds-tab-item__name">{{$t('ds.label.parkLive')}}</div>
      </a>
    </el-popover>
  </div>
</template>

<script>
/*
+-----------------------------------------------------------------------------------------------------------------------
| Author: 17disney <616@17disney.com>  Website：http://www.17disney.com
+-----------------------------------------------------------------------------------------------------------------------
| DS-TAB
| 首页导航切换
*/
const NAME = 'ds-tab'

export default {
  components: {},

  props: {
    routes: Array
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
