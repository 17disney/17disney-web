<style lang='stylus'>
@require '../../styles/disney/var/color.styl';

.footer {
  margin-top: 32px;
  text-align: center;
  padding: 30px;
  background: $color-primary-ss;

  .logo-text {
    color: $color-light-grey;
    cursor: pointer;
    transition: 0.15s;
    width: 192px;
    height: 65px !important;
    margin: 0 auto;
    margin-top: 20px;
    margin-bottom: 50px;

    &:hover {
      transform: scale(1.07) rotate(-1deg);
    }

    svg {
      height: 100%;
    }

    path {
      fill: $color-pick !important;
    }
  }
}

.chart {
  width: 100%;
  height: 400px;

  .inner {
    height: 400px;
  }
}

.wxapp-list {
  margin-bottom: 50px;
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
    margin: 0 20px;
    border: 1px solid rgba(0, 0, 0, 0);
    transition: 0.15s;
    cursor: pointer;

    &:hover {
      filter: blur(0px);
      border-color: $color-primary;
      box-shadow: 0 0 0.5em hsla(0, 0%, 0%, 0.25), 0 0.25em 0.25em hsla(0, 0%, 0%, 0.1);
    }

    &__img {
      width: 100px;
    }

    &__name {
      font-size: 12px;
      color: $color-light-grey-s;
      margin-top: 8px;
    }

    &__desc {
      font-size: 15px;
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
}
</style>
<template>
  <div class="footer">
    <div class="container">
      <logo-text></logo-text>
      <!-- <div class="nav-list">
        <ul>
          <li class="nav-list-item" v-for="(item, index) in navList" :key="index">
            <a :href=" item.url">{{item.name}}</a>
          </li>
        </ul>
      </div> -->
      <div class="wxapp-list">
        <el-tooltip effect="dark" :content="item.name" placement="bottom" v-for="(item, index) in qrList" :key="index">
          <div :class="{ 'is-blur': qrHover}" class="wxapp-list-item" @mouseenter="qrEnter" @mouseleave="qrLeave">
            <img class="wxapp-list-item__img" :src="item.picUrl" :alt="item.desc">
            <!-- <div class="wxapp-list-item__name">{{item.name}}</div> -->
            <div class="wxapp-list-item__desc">{{item.desc}}</div>
          </div>
        </el-tooltip>
      </div>
    </div>
    <div class="footer__end">
      <div class="container">
        <div class="footer__text">
          ©2018 17Disney · 一起迪士尼
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LogoText from '@/components/Layout/LogoText'
export default {
  components: { LogoText },

  props: {
  },

  data() {
    return {
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
          picUrl: '//17disney.com/static/wxapp_17disney.jpg'
        },
        {
          name: '公众号',
          desc: '一起神奇',
          picUrl: '//17disney.com/static/wx_17shenqi.jpg'
        },
        {
          name: '微信小程序',
          desc: '乐园时间表',
          picUrl: '//17disney.com/static/wxapp_timesguide.jpg'
        }
      ]
    }
  },

  computed: {},

  mounted() { },

  methods: {
    qrEnter() {
      this.qrHover = true
    },
    qrLeave() {
      this.qrHover = false
    }
  }
}
</script>
