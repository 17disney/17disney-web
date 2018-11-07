<style lang='stylus'>
@require '~@/styles/disney/var/color.styl';

.footer {
  margin-top: 32px;
  text-align: center;
  background: $color-grey;

  .logo-text {
    color: $color-light-grey;
    cursor: pointer;
    transition: 0.15s;
    width: 192px;
    height: 65px !important;
    margin: 0 auto;
    margin-top: 20px;
    margin-bottom: 45px;

    &:hover {
      path {
        fill: rgba(255, 255, 255, 0.9);
      }

      transform: scale(1.07) rotate(-1deg);
    }

    svg {
      height: 100%;
    }

    path {
      fill: rgba(255, 255, 255, 0.65) !important;
    }
  }
}

.wxapp-list {
  margin-bottom: 45px;
  display: flex;
  justify-content: center;
  transition: 0.15s;

  .is-blur {
    filter: blur(3px);
  }

  &-item {
    background: rgba(255, 255, 255, 1);
    border-radius: 5px;
    padding: 16px;
    margin: 0 16px;
    border: 1px solid rgba(0, 0, 0, 0);
    transition: 0.15s;
    cursor: pointer;

    &:hover {
      filter: blur(0px);
      border-color: $color-primary;
      box-shadow: 0 0 0.5em hsla(0, 0%, 0%, 0.25), 0 0.25em 0.25em hsla(0, 0%, 0%, 0.1);
    }

    &__img {
      width: 95px;
    }

    &__desc {
      font-size: 13px;
      color: $color-grey;
    }
  }
}

.footer {
  .nav-list {
    text-align: center;
    padding: 15px 0;

    ul {
      display: flex;
      justify-content: center;
    }

    &-item {
      list-style: none;
      margin: 0 15px;

      a {
        color: $color-grey;
        text-decoration: none;
        transition: 0.15s;

        &:hover {
          color: $color-primary;
        }
      }
    }
  }

  &-wrap {
    padding: 70px 24px;
    background-color: $color-grey;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }

  &-end {
    &-wrap {
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      padding: 25px 0;
    }

    &-text {
      font-size: 14px;
      color: rgba(255, 255, 255, 0.65);
    }
  }

  &-nav {
    &-list {
      margin: 0 auto;
      text-align: left;

      h2 {
        color: #FFF;
        font-size: 16px;
        font-weight: 500;
        margin-bottom: 30px;
      }
    }

    &-item {
      font-size: 14px;
      margin: 12px 0;

      a {
        color: hsla(0, 0%, 100%, 0.9);
        transition: color 0.3s ease;
        text-decoration: none;
        cursor: pointer;

        &:hover {
          color: $color-primary;
        }

        &:active {
          color: $color-pick;
        }
      }
    }
  }
}
</style>
<template>
  <div class="footer">
    <div class="footer-wrap">
      <div class="container">
        <el-row :gutter="20">
          <el-col :span="6">
            <div class="footer-nav-list">
              <h2>{{$t('ds.disneyLand.name')}}</h2>
              <div class="footer-nav-item" v-for="item in LOCAL" :Key="item.value">
                <a v-show="item.open" @click="handleLocalSelect(item.value)" href="">{{$t(item.label )}}</a>
              </div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="footer-nav-list">
              <h2>{{$t('ds.navbar.community')}}</h2>
              <div class="footer-nav-item">
                <router-link to="/about">
                  <span>{{$t('ds.navbar.aboutUs')}}</span>
                </router-link>
              </div>
              <div class="footer-nav-item">
                <a href="https://github.com/17disney" target="_blank">Github</a>
              </div>
              <div class="footer-nav-item">
                <a href="https://www.teambition.com/project/599a9f9057a52125393e005a/tasks/scrum/599a9f9031a0652c018a5626" target="_blank">teambition</a>
              </div>
              <div class="footer-nav-item">
                <a href="http://xank.cn" target="_blank">Xank Blog</a>
              </div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="footer-nav-list">
              <h2>{{$t('ds.navbar.related')}}</h2>
              <div class="footer-nav-item">
                <a href="https://www.shanghaidisneyresort.com/" target="_blank">上海迪士尼度假区</a>
              </div>
              <div class="footer-nav-item">
                <a href="http://tieba.baidu.com/f?kw=%C9%CF%BA%A3%B5%CF%CA%BF%C4%E1" target="_blank">上海迪士尼贴吧</a>
              </div>
              <div class="footer-nav-item">
                <a href="http://17shenqi.com" target="_blank">一起神奇网</a>
              </div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="footer-nav-list">
              <h2>{{$t('ds.navbar.language')}}</h2>
              <div class="footer-nav-item" v-for="item in LOCALE" :key="item.value">
                <a @click="handleLocaleSelect(item.value)">
                  {{item.label}}
                </a>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="container">
      <logo-text></logo-text>
      <div class="wxapp-list">
        <el-tooltip effect="light" :content="item.name" placement="top" v-for="(item, index) in qrList" :key="index">
          <div :class="{ 'is-blur': qrHover}" class="wxapp-list-item" @mouseenter="qrEnter" @mouseleave="qrLeave">
            <img class="wxapp-list-item__img" :src="item.picUrl" :alt="item.desc">
            <!-- <div class="wxapp-list-item__name">{{item.name}}</div> -->
            <div class="wxapp-list-item__desc">{{item.desc}}</div>
          </div>
        </el-tooltip>
      </div>
    </div>
    <div class="footer-end-wrap">
      <div class="container">
        <div class="footer-end-text">
          ©2018 17Disney · 一起迪士尼
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LogoText from '@/components/Layout/LogoText'
import LOCAL from 'packages/17disney-common/const/local'
import LOCALE from 'packages/17disney-common/const/locale'

export default {
  components: { LogoText },

  props: {
  },

  data() {
    return {
      LOCAL,
      LOCALE,
      qrHover: false,
      navList: [
        {
          name: '一起神奇吧',
          url: 'http://www.17shenqi.com'
        },
        {
          name: '一起迪士尼',
          url: 'http://www.17disney.com'
        }
      ],
      qrList: [
        {
          name: '微信小程序',
          desc: '17俱乐部',
          picUrl: '/static/wxapp_17disney.jpg'
        },
        {
          name: '公众号',
          desc: '一起神奇',
          picUrl: '/static/wx_17shenqi.jpg'
        },
        {
          name: '微信小程序',
          desc: '乐园时间表',
          picUrl: '/static/wxapp_timesguide.jpg'
        }
      ]
    }
  },

  computed: {},

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

    qrEnter() {
      this.qrHover = true
    },
    qrLeave() {
      this.qrHover = false
    }
  }
}
</script>
