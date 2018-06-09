<style lang="stylus">
@require '../../styles/disney/var/color.styl';

.header {
  height: 80px;
  color: #fff;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  position: relative;
  position: absolute;
  z-index: 200;

  .container {
    height: 100%;
  }

  .logo {
    margin: 0;
    float: left;
    font-size: 32px;
    font-weight: 400;
  }

  .nav {
    float: right;
    background: transparent;
    padding: 0;
    margin: 0;
    z-index: 10;
  }

  .nav-item {
    margin: 0;
    float: left;
    list-style: none;
    cursor: pointer;

    .insert {
      margin-top: 10px;
      font-size: 17px;
      text-decoration: none;
      color: #FFF;
      display: block;
      padding: 0 18px;
      opacity: 0.8;
      transition: 0.15s;

      &:hover {
        opacity: 1;
      }

      .name {
        line-height: 48px;
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

    &__icon {
      font-size: 30px;
    }

    &__name {
      font-size: 13px;
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
    line-height: 36px;
    font-size: 16px;
    padding: 0 16px;

    &:hover {
      background-color: $color-light-grey-sss;
      color: $color-primary;
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
        <!-- 地区选择 -->
        <li class="nav-item">
          <el-popover popper-class="popover-park-list" placement="bottom" width="500" trigger="hover">
            <div class="park-list">
              <div @click="handleLocalSelect(item.value)" class="park-list-item" :class="{'is-close': !item.open, 'is-active': item.value === local}" v-for="item in LOCAL">
                <div class="park-list-item__icon icon--pep" :class="'icon__' + item.icon"></div>
                <div class="park-list-item__name">{{$t(item.label)}}</div>
              </div>
            </div>
            <a slot="reference" class="insert">
              <span class="name">{{$t('ds.disneyLand.' + local)}}</span>
              <i class="el-icon-arrow-down el-icon--right"></i>
            </a>
          </el-popover>
        </li>
        <!-- 语言选择 -->
        <li class="nav-item">
          <el-popover popper-class="popover-locale" placement="bottom" width="200" trigger="hover">
            <ul class="locale-select">
              <li @click="handleLocaleSelect(item.value)" class="locale-select-item" v-for="item in LOCALE" :key="item.value">
                {{item.label}}
              </li>
            </ul>
            <a slot="reference" class="insert">
              <span class="name">{{locale | locale}}</span>
              <i class="el-icon-arrow-down el-icon--right"></i>
            </a>
          </el-popover>
        </li>
        <li class="nav-item">
          <el-popover placement="bottom-end" width="200" trigger="hover">
            <div class="popover-wxapp">
              <img src="static/wxapp_17disney.jpg" alt="">
              <div class="popover-wxapp__title">{{$t('ds.title.scanMiniProgram')}}</div>
            </div>
            <div class="insert" slot="reference" href="">
              <span class="name">{{$t('ds.label.miniProgram')}}</span>
            </div>
          </el-popover>
        </li>
      </ul>
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
