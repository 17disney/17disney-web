<style lang="stylus">
@require '../../styles/disney/var/color.styl';

.header {
  color: #fff;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  position: relative;
  z-index: 200;
  background: #FFF;
  border-bottom: 1px solid rgba($color-grey, 0.2);

  #logo {
    float: left;
    margin-top: 15px;
    height: 40px;

    path {
      fill: $color-pick;
    }
  }

  &__top {
    height: 30px;
    font-size: 13px;
    line-height: 30px;

    .container {
      border-bottom: 1px solid $color-light-grey-sss;
      overflow: hidden;
    }

    a {
      cursor: pointer;
      color: $color-light-grey;

      &:hover {
        color: $color-primary;
      }
    }

    .nav-top-left {
      float: left;
    }

    .nav-top {
      float: right;

      &-item {
        margin: 0;
        float: left;
        list-style: none;
        cursor: pointer;
        padding-left: 20px;
      }
    }
  }

  &__main {
    height: 68px;
  }

  .nav {
    float: right;
    background: transparent;
    padding: 0;
    margin: 0;
    z-index: 10;

    &-item {
      margin: 0;
      float: left;
      list-style: none;
      cursor: pointer;

      .insert {
        margin-top: 12px;
        font-size: 15px;
        line-height: 40px;
        padding: 8px 10px;
        text-decoration: none;
        color: $color-grey;
        display: block;
        margin-left: 25px;
        opacity: 0.9;
        transition: 0.15s;
        border-bottom: 1px solid rgba(0, 0, 0, 0);

        &.router-link-active {
          color: $color-primary;
          border-bottom-color: $color-primary;
        }

        &:hover {
          color: $color-primary;
        }

        .el-icon--right {
          font-size: 12px;
        }
      }
    }
  }
}

.park-list {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;

  &-item {
    width: 150px;
    padding: 10px 0;
    text-align: center;
    cursor: pointer;
    color: $color-light-grey;
    transition: 0.2s;

    &:hover {
      color: $color-primary;
    }

    &:active {
      color: $color-primary-s;
    }

    &__icon {
      font-size: 30px;
    }

    &.is-close {
      opacity: 0.6;
      cursor: default;

      &:hover {
        color: $color-light-grey;
      }
    }

    &.is-active {
      color: $color-primary;
    }
  }
}

.popover-locale {
  padding: 0px !important;
}

.popover-park-list {
  padding: 0px !important;
}

.locale-select {
  padding: 8px 0;

  &-item {
    list-style: none;
    cursor: pointer;
    line-height: 32px;
    font-size: 13px;
    padding: 0 12px;

    &:hover {
      background-color: $color-light-grey-sss;
      color: $color-primary;
    }
  }
}
</style>

<template>
  <div class="header">
    <div class="header__top">
      <div class="container">
        <!-- 小程序 -->
        <el-popover placement="bottom-start" width="230" trigger="hover">
          <div class="popover-wxapp">
            <img src="//17disney.com/static/wxapp_17disney.jpg" alt="">
            <div class="popover-wxapp__title">{{$t('ds.title.scanMiniProgram')}}</div>
          </div>
          <div class="nav-top-left" slot="reference">
            <a>{{$t('ds.label.miniProgram')}}</a>
          </div>
        </el-popover>
        <ul class="nav-top">
          <!-- 地区选择 -->
          <li class="nav-top-item">
            <el-popover popper-class="popover-park-list" placement="bottom" width="500" trigger="hover">
              <div class="park-list">
                <div @click="handleLocalSelect(item.value)" class="park-list-item" :class="{'is-close': !item.open, 'is-active': item.value === local}" v-for="item in LOCAL">
                  <div class="park-list-item__icon icon--pep" :class="'icon__' + item.icon"></div>
                  <div class="park-list-item__name">{{$t(item.label)}}</div>
                </div>
              </div>
              <a slot="reference" class="insert">
                <span>{{$t('ds.disneyLand.' + local)}}</span>
                <i class="el-icon-arrow-down el-icon--right"></i>
              </a>
            </el-popover>
          </li>

          <!-- 语言选择 -->
          <li class="nav-top-item">
            <el-popover popper-class="popover-locale" placement="bottom" width="90" trigger="hover">
              <ul class="locale-select">
                <li @click="handleLocaleSelect(item.value)" class="locale-select-item" v-for="item in LOCALE" :key="item.value">
                  {{item.label}}
                </li>
              </ul>
              <a slot="reference" class="insert">
                <span>{{locale | locale}}</span>
                <i class="el-icon-arrow-down el-icon--right"></i>
              </a>
            </el-popover>
          </li>
        </ul>
      </div>
    </div>
    <div class="header__main">
      <div class="container">
        <h1 class="logo">
          <a href="/">
            <logo-text></logo-text>
          </a>
        </h1>
        <ul class="nav">
          <!-- <li class="nav-item">
            <router-link to="/home" class="insert">
              <span>首页</span>
            </router-link>
          </li> -->
          <li v-if="local === 'shanghai'" class="nav-item">
            <router-link to="/forecast" class="insert">
              <span>客流预测</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/history" class="insert">
              <span>历史等候</span>
            </router-link>
          </li>
          <!-- <li class="nav-item">
            <router-link to="/live" class="insert">
              <span>乐园实况</span>
            </router-link>
          </li> -->
          <li v-if="local === 'shanghai'" class="nav-item">
            <router-link to="/ticket" class="insert">
              <span>售票量</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/about" class="insert">
              <span>关于</span>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import LogoText from './LogoText.vue'
import LOCAL from 'package/17disney-common/const/local'
import LOCALE from 'package/17disney-common/const/locale'
import base from '@/common/mixins/base'

export default {
  components: { LogoText },

  mixins: [base],

  props: {
  },

  data() {
    return {
      LOCAL,
      LOCALE,
      detail: false,
      timeout: null,
      visible: false,
    }
  },

  computed: {
    ...mapState({
      'locale': state => state.app.locale
    })
  },

  mounted() {

  },

  methods: {
    // 语言选择
    handleLocaleSelect(value) {
      this.$store.dispatch('setLocale', value)
      location.reload()
    },
    // 地区选择
    handleLocalSelect(val) {
      const localInfo = LOCAL.find(_ => _.value === val)
      if (!localInfo.open) return
      this.$store.dispatch('setLocal', val)
      location.reload()
    },
    enter() {
      this.detail = true
    },
    leave() {
      this.detail = false
    },
    show() {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.visible = true;
      }, this.trigger === 'click' ? 0 : 250);
    },
    hide() {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.visible = false;
      }, this.trigger === 'click' ? 0 : 150);
    },

  }
}
</script>
