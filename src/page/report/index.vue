<style lang='stylus' scoped>
@require '../../styles/disney/var/color.styl';

.container {
  margin-top: 32px;
}

.ds-card--report-top {
  text-align: center;
  background: linear-gradient(to bottom, $color-pick-d2, $color-primary-dark);
  border-radius: 10px;
  padding: 40px 0;

  .icon {
    font-size: 70px;
    height: 70px;
    color: rgb(126, 130, 226);
  }

  .title {
    margin-bottom: 20px;
    margin-top: 5px;
    color: $color-primary-ss;
    font-size: 20px;

    &--date {
      font-size: 16px;
      // font-weight: 600;
      color: $color-primary-ss;
    }

    &--desc {
      font-size: 15px;
      margin-bottom: 0px;
      color: $color-primary-ss;
    }
  }

  .image--qrcode {
    width: 100px;
    padding: 4px;
    background: #FFF;
    border-radius: 10px;
    margin-bottom: 10px;
    overflow: hidden;
  }
}

.ds-card-header--icon {
  display: flex;
  align-items: center;

  .ds-card-header {
    &__icon {
      font-size: 50px;
      color: $color-primary;
      margin-right: 15px;
    }
  }

  .title {
    font-weight: 600;
    font-size: 20px;
    color: $color-grey;

    &--desc {
      margin-top: 5px;
      color: $color-primary;
    }
  }
}
</style>
<template>
  <div class="container">
    <el-row>
      <el-col :span="12">
        <dm-card type="report" class="ds-card--report-top">
          <div class="icon icon--pep icon__shanghai-disney-resort"></div>
          <div class="title">上海迪士尼乐园运营日报</div>
          <div class="title--date">{{date | timeFormat('YYYY 年 M 月 D 日')}}</div>
        </dm-card>

        <dm-card type="report">
          <div slot="header" class="ds-card-header--icon">
            <div class="ds-card-header__icon icon--pep icon__business-excellence"></div>
            <div class="ds-card-header__text">
              <div class="title">乐园综合指数</div>
              <div class="title--desc">超过了 {{dataCount.flowRank}}% 运营日</div>
            </div>
          </div>
          <day-park-num-charts :data="dataParkNum"></day-park-num-charts>
        </dm-card>

        <dm-card type="report">
          <div slot="header" class="ds-card-header--icon">
            <div class="ds-card-header__icon icon--pep icon__personal-magic"></div>
            <div class="ds-card-header__text">
              <div class="title">乐园热门时刻</div>
              <div class="title--desc">最多有 {{dataPark.flowMax | formatNumber}} 位游客在乐园</div>
            </div>
          </div>
          <day-park-mark-charts :data="dataParkFlow"></day-park-mark-charts>
        </dm-card>

        <dm-card type="report">
          <div slot="header" class="ds-card-header--icon">
            <div class="ds-card-header__icon icon--pep icon__shdr-fastpass"></div>
            <div class="ds-card-header__text">
              <div class="title">快速通行证领取速度</div>
              <div class="title--desc" v-if="dataAttFp && dataAttFp.length > 0">最后张快速通行证在 {{dataAttFp[0]['fpFinish'] | timeFormat('H:mm', 'x')}} 被领取</div>
            </div>
          </div>
          <day-att-fp-charts :data="dataAttFp"></day-att-fp-charts>
          <!-- <p>开园仅 38 分钟，翱翔·飞跃地平线的快速通行证就被领完</p>
          <p>最后一张快速通行证在 12:16 领完</p> -->
        </dm-card>

        <dm-card type="report">
          <div slot="header" class="ds-card-header--icon">
            <div class="ds-card-header__icon icon--pep icon__magic-morning"></div>
            <div class="ds-card-header__text">
              <div class="title">热门项目等候时间</div>
              <div class="title--desc">超过了 {{dataCount.markRank}}% 运营日</div>
            </div>
          </div>
          <day-att-rank-charts :data="dataAtt"></day-att-rank-charts>
        </dm-card>

        <dm-card type="report" class="ds-card--report-top">
          <img src="//17disney.com/static/wx_17shenqi.jpg" alt="一起神奇" class="image--qrcode">
          <div class="title--desc">本数据由 17Disney.com 统计发布</div>
        </dm-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import base from '@/common/mixins/base'
import moment from 'moment'
import ChartsDayFlowMark from '@/components/Charts/ChartsDayFlowMark'
import DayParkMarkCharts from '@/components/Charts/DayParkMarkCharts'
import DayParkNumCharts from '@/components/Charts/DayParkNumCharts'
import DayAttRankCharts from '@/components/Charts/DayAttRankCharts'
import DayAttFpCharts from '@/components/Charts/DayAttFpCharts'
import { lineToObject } from '@/utils/tool'
import { arrayToHash, compare } from '@/utils/array'

export default {
  mixins: [base],

  components: { ChartsDayFlowMark, DayParkMarkCharts, DayAttRankCharts, DayParkNumCharts, DayAttFpCharts },

  props: {
  },

  data() {
    return {
      date: null,
      dataPark: {},
      dataAtt: [],
      dataOperate: {},
      dataParkNum: [],
      dataParkFlow: [],
      dataAttFp: [],
      dataCount: {}
    }
  },

  computed: {},

  mounted() {
    const { date } = this.$route.params
    this.date = date
    this.init()
  },

  methods: {
    async init() {
      let dataPark = await this.$Api.waitTimes.parkDate(this.local, this.date)
      this.dataPark = dataPark || {}

      const { flowMax, openAtt, markMax, markHour, flowHour, show } = dataPark
      const { allFlowDay, allMarkDay, rankMarkDay, rankFlowDay } = dataPark

      // 热门时刻表单
      const dataParkFlow = []
      markHour.forEach((item, index) => {
        const [hour, mark] = item
        dataParkFlow.push({
          hour,
          mark,
          flow: flowHour[index][1]
        })
      })

      // dataParkFlow[7]['flow'] = 49565

      this.dataParkFlow = dataParkFlow

      this.dataCount.flowRank = 100 - parseInt(rankMarkDay / allMarkDay * 100)
      this.dataCount.markRank = 100 - parseInt(rankFlowDay / allFlowDay * 100)

      // 读取项目等候时间
      let waitsData = await this.$Api.waitTimes.waitsHome(this.local, this.date)
      waitsData = arrayToHash(waitsData, 'id')

      // 合并等候时间
      let dataAtt = await this.$Api.waitTimes.destinations(this.local)
      dataAtt = dataAtt.filter(item => item.type === 'attraction')

      const dataAttFp = []
      dataAtt.forEach(item => {
        item.aid = lineToObject(item.id)['__id__']

        item.waitAvg = 0
        if (waitsData[item.aid]) {
          const { fpFinish, waitAvg, waitMax } = waitsData[item.aid]
          if (fpFinish > 0) {
            if (item.name === '抱抱龙冲天赛车') return
            const _fpFinish = fpFinish - moment(this.date, 'YYYY-MM-DD').format('x') - 60 * 60 * 1000 * 7
            dataAttFp.push({
              name: item.name,
              fpFinish: _fpFinish
            })
          }
          item.waitAvg = waitAvg
          item.waitMax = waitMax
          item.fpFinish = fpFinish
        }
      })

      this.dataAttFp = dataAttFp.sort(compare('fpFinish'))

      dataAtt = dataAtt.sort(compare('waitAvg'))
      dataAtt.length = 10
      console.log(dataAtt)
      this.dataAtt = dataAtt

      // 处理乐园指数
      let dataOperate = await this.$Api.waitTimes.operateCount(this.local)
      const { flowMaxAvg, markMaxAvg, showAvg, openAttAvg } = dataOperate

      const dataParkNum = [
        {
          name: '客流量',
          max: 70000,
          today: flowMax,
          history: flowMaxAvg
        },
        {
          name: '演出场次',
          max: 70,
          today: show,
          history: showAvg
        },
        {
          name: '等候时间',
          max: 2500,
          today: markMax,
          history: markMaxAvg
        },
        {
          name: '开放项目',
          max: 50,
          today: openAtt,
          history: openAttAvg
        }
      ]
      this.dataParkNum = dataParkNum
    }
  }
}
</script>
