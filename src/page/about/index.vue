<style lang='stylus'>
@require '../../styles/disney/var/color.styl';

.content {
  padding: 50px 30px;
  color: $color-grey;
  max-width: 960px;
  margin: 0 auto;

  h2 {
    font-size: 24px;
    margin-top: 24px;
    margin-bottom: 16px;
    color: $color-grey;
    border-bottom: 1px solid $color-light-grey-sss;
    padding-bottom: 10px;
  }

  p {
    line-height: 1.5;
    margin-bottom: 10px;
  }

  ul {
    padding-left: 20px;

    .date {
      font-weight: 600;
      font-size: 15px;
    }

    li {
      margin-bottom: 30px;
      font-size: 16px;

      dl {
        margin-bottom: 10px;
      }
    }

    p {
      margin-bottom: 10px;
    }
  }

  .qrcode {
    width: 250px;
    margin-right: 30px;
  }
}
</style>
<template>
  <div class="container">
    <div class="content">
      <h2>关于我们</h2>
      <p>17Disney 创建于 2017年4月，致力于提供迪士尼乐园等候时间查询及预测，以及相关互动社区服务。
        <p>创办至今已上线了 17Disney（www.17disney.com），一起神奇网（www.17shenqi.com），微信小程序 “17俱乐部” 和 “乐园时间表”。</p>
      </p>
      <h2>开发进度</h2>
      <ul>
        <li v-for="item in timeline" :key="item.date">
          <p class="date">{{item.date}}</p>
          <dl v-for="(text, key) in item.content" :key="key">{{text}}</dl>
        </li>
      </ul>
      <h2>参与贡献</h2>
      <p>
        我们的前端使用 VueJS，React Native（正在开发），mpvue，Echart 等技术，后端使用 Docker，NodeJS，eggJS，MongoDB，Redis，Python，Scikit-Learn 等技术。
      </p>
      <p><strong>我们非常希望你能加入我们参与贡献！</strong></p>
      <p>
        Github:
        <a href="https://github.com/17disney" target="_blank">17Disney Github</a> - 参与代码贡献
      </p>
      <p>
        teambition:
        <a href="https://www.teambition.com/project/599a9f9057a52125393e005a/tasks/scrum/599a9f9031a0652c018a5626" target="_blank">17Disney teambition</a>
        - 查看项目计划
      </p>
      <h2>联系站长</h2>
      <p>
        <img class="qrcode" src="http://cdn.17disney.com/_20180612005536.jpg" alt="">
      </p>
      <h2>捐赠</h2>
      <p>
        <img class="qrcode" src="http://cdn.17disney.com/xank-pay-alipay-50.jpg" alt="">
        <img class="qrcode" src="http://cdn.17disney.com/xank-pay-weixin-50.jpg" alt="">
      </p>
    </div>
  </div>
</template>

<script>
export default {
  components: {},

  props: {
  },

  data() {
    return {
      timeline: [
        {
          date: '2017-04-10',
          content: [
            '17Disney 项目开始'
          ]
        },
        {
          date: '2017-04-11',
          content: [
            '完成等候时间采集服务'
          ]
        },
        {
          date: '2017-04-17',
          content: [
            '17Disney 官网上线',
            '支持乐园信息查询'
          ]
        },
        {
          date: '2017-05-25',
          content: [
            '增加等候时间预测功能'
          ]
        },
        {
          date: '2017-07-01',
          content: [
            '开始采集客流量数据'
          ]
        },
        {
          date: '2018-01-18',
          content: [
            '注册 “一起神奇” 公众号'
          ]
        },
        {
          date: '2018-02-18',
          content: [
            '开始采集全球迪士尼乐园等候时间'
          ]
        },
        {
          date: '2018-03-10',
          content: [
            '后端服务器转 NodeJS'
          ]
        },
        {
          date: '2018-04-10',
          content: [
            '微信小程序 - “17俱乐部” 上线，支持实时等候时间和历史等候时间查询'
          ]
        },
        {
          date: '2018-04-28',
          content: [
            '微信小程序 - “乐园时间表” 上线，支持乐园时间表互动交换'
          ]
        },
        {
          date: '2018-05-03',
          content: [
            '“一起神奇吧” 官网上线（www.17shenqi.com）',
            '“一起神奇吧” 支持乐园时间表、乐园指南等查询'
          ]
        },
        {
          date: '2018-05-13',
          content: [
            '客流预测算法升级，准确率提升至85%'
          ]
        },
        {
          date: '2018-05-28',
          content: [
            '微信小程序 - “乐园时间表” 支持查询20天乐园时间表'
          ]
        },
        {
          date: '2018-06-09',
          content: [
            '官网支持国际迪士尼乐园等候时间查询'
          ]
        },
        {
          date: '2018-06-10',
          content: [
            '官网支持多语言切换'
          ]
        },
        {
          date: '2018-06-15',
          content: [
            '官网增加售票量查询',
            '增加购买门票'
          ]
        }
      ]
    }
  },

  computed: {},

  mounted() { },

  methods: {}
}
</script>
